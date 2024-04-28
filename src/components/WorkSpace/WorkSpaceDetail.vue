<template>
  <div class="workSpaceLists">
    <!-- Top Bar -->
    <div class="topBarContainer">
      <div class="topBar">
        <h4>{{ localWorkspaceName }}</h4>
        <!-- Clickable "Settings" link -->
        <p @click="openEditPopup" class="clickable">Settings</p>
      </div>
    </div>

    <!-- Lists Section -->
    <div class="Lists">
      <!-- Render each WorkPlaceList component -->
      <WorkPlaceLists
        v-for="(WorkPlaceList, index) in lists"
        :key="`${componentKey}-${index}`"
        :listName="WorkPlaceList.listName"
        :listId="WorkPlaceList.listId"
        @refreshLists="fetchLists"
        @refresh-tasks="forceRerender"
      ></WorkPlaceLists>

      <!-- Add a new list -->
      <div class="List ListAdd">
        <div class="ListName">
          <!-- Input field for adding a list -->
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

  <!-- Task Popup and Edit Workspace Popup -->
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
      componentKey: 0,
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
        const response = await axios.get(`http://localhost:5236/list/workspace/${wId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
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
        const response = await axios.get(`http://localhost:5236/workspace/${wId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = response.data;

        this.localWorkspaceName = data.workspaceName;
        this.localWorkspaceDescription = data.workspaceDescription;
      } catch (error) {
        console.error("Error fetching workspace name:", error);
      }
    },
    async addList(listInput) {
      try {
        if (!listInput) {
          return;
        }
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
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  overflow: auto;
  min-height: 100vh;
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
}

input:hover,
input:focus {
  border-bottom: 1px solid #ffffff;
}
.ListAdd {
  // padding: 3rem 0px;
  background-color: #3f3f3f65;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  .ListName {
    min-width: 30rem;
    padding: 3rem 2rem;
    margin: 0 auto;
    min-width: 80%;
    input {
      color: #fff;
      width: 30rem;
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
