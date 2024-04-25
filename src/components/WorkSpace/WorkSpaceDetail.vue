<template>
  <div class="workSpaceLists">
    <div class="topBarContainer">
      <div class="topBar">
        <!-- todo take the name as a prop -->
        <h4>{{ localWorkspaceName }}</h4>
        <p @click="openSettingsPopup" class="clickable">Settings</p>
      </div>
    </div>
    <div class="Lists">
      <div class="List" v-for="list in lists" :key="list.listId">
        <div class="ListName">
          <input type="text" v-model="list.listName" @blur="updateListName(list)" />
          <p class="clickable expandInput removeList" @click="deleteList(list)">X</p>
        </div>
        <!-- todo make this into a another file and import it -->
        <div class="Task expandInput" @click="openTaskDetail">
          <p class="Title">
            Title of the task and this can be as long as possible
          </p>
          <div>
            <div class="members">
            </div>
          </div>
        </div>


        <div class="Task TaskAdd">
          <p class="Title">
            <input type="text" placeholder="+  Add a task" value="" />
          </p>
        </div>

      </div>

      <div class="List ListAdd">
        <div class="ListName">
          <input type="text" placeholder="+ Add a list" v-model="listInput" @blur="addList(listInput)"/>
        </div>
      </div>
    </div>
  </div>
  <TaskPopup v-if="showTaskDetail" @close="showTaskDetail = false" />
  <SettingsWorkPlacePopup
    v-if="showSettingsPopup"
    @close="showSettingsPopup = false"
    :workplaceName="workplaceName"
    :members="members"
  />
</template>

<script>
import SettingsWorkPlacePopup from "../popups/EditWorkPlace/EditWorkPlacePopup";
import TaskPopup from "../popups/TaskPopup/TaskPopup.vue";
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  name: "WorkPlaceDetail",
  components: {
    SettingsWorkPlacePopup,
    TaskPopup,
  },
  props: {
    workspaceName: String,
  },
  data() {
    return {
      showSettingsPopup: false,
      showTaskDetail: false,
      members: [],
      lists: [],
      localWorkspaceName: '',
      listInput: ''
    };
  },
  created() {
    this.fetchLists();
    this.fetchWorkplaceName();
  },
  methods: {
    openSettingsPopup() {
      this.showSettingsPopup = !this.showSettingsPopup;
    },
    openTaskDetail() {
      this.showTaskDetail = !this.showTaskDetail;
    },
    async fetchLists() {
      try {
        const token = Cookies.get('token');
        const wId = this.$route.params.wId;
        const response = await axios.get(`http://localhost:5236/list/workspace/${wId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        const data = response.data;
        console.log(data);
        this.lists = data;

      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    },
    async fetchWorkplaceName() {
      try {
        const token = Cookies.get('token');
        const wId = this.$route.params.wId;
        const response = await axios.get(`http://localhost:5236/workspace/${wId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });
        const data = response.data;

        this.localWorkspaceName = data.workspaceName;

      } catch (error) {
        console.error('Error fetching workspace name:', error);
      }
    },
    async updateListName(list) {
      try {
        const token = Cookies.get('token');
        const response = await axios.put(`http://localhost:5236/list/${list.listId}`, {
          listId: list.listId,
          listName: list.listName,
          workSpace: {
            user: {
              email: ''
            }
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 204) {
          console.log('List name updated successfully');
        } else {
          console.error('Failed to update list name');
        }
      } catch (error) {
        console.error('Error updating list name:', error);
      }
    },
    async addList(listInput) {
      try {
        const wId = this.$route.params.wId;
        const token = Cookies.get('token');
        const response = await axios.post(`http://localhost:5236/list`, {
          listId: '0',
          listName: listInput,
          workSpaceId: wId,
          workSpace: {
            user: {
              email: ''
            }
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          this.listInput = '';
          this.fetchLists();
          console.log('List added successfully');
        } else {
          console.error('Failed to added list');
        }
      } catch (error) {
        console.error('Error adding list: ', error);
      }
    },
    async deleteList(list) {
      try {
        const token = Cookies.get('token');
        const response = await axios.delete(`http://localhost:5236/list/${list.listId}`,  {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 204) {
          this.fetchLists();
          console.log('List deleted successfully');
        } else {
          console.error('Failed to deleted list');
        }
      } catch (error) {
        console.error('Error deleteing list: ', error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
// todo hide the scroll bar
.workSpaceLists {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .topBarContainer {
    width: 100%;
    .topBar {
      padding: 5rem 10rem;
      border-bottom: 1px solid #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.Lists {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: scroll;
  // overflow: hidden;
  .removeList {
    transition: 0.1s;
    
  }
  .removeList:hover {
    color: rgb(154, 40, 40);
  }
}
.List {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex;
  max-width: 80rem;
  width: 20%;

  min-height: 100%;
  background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  overflow: hidden;
  .Task:hover {
    background-color: #ffffff50;
  }
  .Task:active {
    transform: scale(0.95);
  }
  .Task {
    transition: 0.1s;
    cursor: pointer;
    width: 100%;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .members {
      display: flex;
      gap: 0.6rem;
      img {
        background-color: rgb(51, 51, 117);
        width: 3rem;
        aspect-ratio: 1/1;
        border-radius: 100%;
      }
    }
  }
  .ListName {
    padding: 3rem 0px;
    width: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.TaskAdd {
  input {
    width: 100%;
    text-align: center;
  }
}
.TaskAdd:hover {
  input::placeholder {
    color: #ffffffbd;
  }
}
input {
  transition: 0.2s;
  background: none;
  color: #fff;
  border: none;
  outline: none;
  border-bottom: 1px solid #ffffff73;
  width: 80%;
}
input:hover,
input:focus {
  border-bottom: 1px solid #ffffff;
}
.ListAdd {
  position: relative;
  // bottom: -50%;
  border-right: 1px solid #fff;
  .ListName {
    input {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 890px) {
  .workSpaceLists {
    .topBarContainer {
      .topBar {
        padding: 3rem 5%;
      }
    }
  }
}
</style>
