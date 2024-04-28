<template>
  <div class="workSpaceLists">
    <div class="topBarContainer">
      <div class="topBar">
        <!-- todo take the name as a prop -->
        <h4>{{ localWorkspaceName }}</h4>
        <p @click="openEditPopup" class="clickable">Settings</p>
      </div>
    </div>
    <div class="Lists">
      <template v-for="(WorkPlaceList, index) in lists" :key="index">
        <WorkPlaceLists
          :listName="WorkPlaceList.listName"
          :listId="WorkPlaceList.listId"
          @refreshLists="fetchLists"
        >
        </WorkPlaceLists>
      </template>

      <div class="List ListAdd">
        <div class="ListName">
          <input
            type="text"
            placeholder="+ Add a list"
            v-model="listInput"
            @blur="addList(listInput)"
          />
        </div>
      </div>
    </div>
  </div>
  <TaskPopup v-if="showTaskDetail" @close="showTaskDetail = false" />
  <EditWorkPlacePopup
    v-if="showEditPopup"
    @close="showEditPopup = false"
    :workplaceName="localWorkspaceName"
    :members="members"
    :workplaceDescription="localWorkspaceDescription"
    :wId="this.$route.params.wId"
  />
</template>

<script>
import EditWorkPlacePopup from "../popups/EditWorkPlace/EditWorkPlacePopup.vue";
import WorkPlaceLists from "./Lists/Lists.vue";
import TaskPopup from "../popups/TaskPopup/TaskPopup.vue";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "WorkPlaceDetail",
  components: {
    EditWorkPlacePopup,
    TaskPopup,
    WorkPlaceLists,
  },
  props: {
    workspaceName: String,
  },
  data() {
    return {
      showEditPopup: false,
      showTaskDetail: false,
      members: [],
      lists: [],
      localWorkspaceName: "",
      localWorkspaceDescription: "",
      listInput: "",
    };
  },
  created() {
    this.fetchLists();
    this.fetchWorkplaceName();
  },
  methods: {
    openEditPopup() {
      this.showEditPopup = !this.showEditPopup;
    },
    openTaskDetail() {
      this.showTaskDetail = !this.showTaskDetail;
    },
    async fetchLists() {
      try {
        const token = Cookies.get("token");
        const wId = this.$route.params.wId;
        const response = await axios.get(
          `http://localhost:5236/list/workspace/${wId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = response.data;
        //console.log(data);
        this.lists = data.map((List) => ({
          listId: List.listId,
          listName: List.listName,
        }));
      } catch (error) {
        if (error.response.status === 404) {
          this.lists = [];
        } else {
          console.error("Error fetching lists:", error.message);
        }
      }
    },
    async fetchWorkplaceName() {
      try {
        const token = Cookies.get("token");
        const wId = this.$route.params.wId;
        const response = await axios.get(
          `http://localhost:5236/workspace/${wId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = response.data;

        this.localWorkspaceName = data.workspaceName;
        this.localWorkspaceDescription = data.workspaceDescription;
      } catch (error) {
        console.error("Error fetching workspace name:", error);
      }
    },
    async addList(listInput) {
      try {
        const wId = this.$route.params.wId;
        const token = Cookies.get("token");
        const response = await axios.post(
          `http://localhost:5236/list`,
          {
            listId: "0",
            listName: listInput,
            workSpaceId: wId,
            workSpace: {
              user: {
                email: "",
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          this.listInput = "";
          this.fetchLists();
          console.log("List added successfully");
        } else {
          console.error("Failed to added list");
        }
      } catch (error) {
        console.error("Error adding list: ", error);
      }
    },
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
  display: flex;
  .removeList {
    transition: 0.1s;
  }
  .removeList:hover {
    color: rgb(154, 40, 40);
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
  padding: 3rem 0px;
  background-color: #3f3f3f65;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  .ListName {
    margin: 0 auto;
    width: 80%;
    input {
      color: #fff;
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
  .List {
    min-width: 30rem;
  }
}
</style>
