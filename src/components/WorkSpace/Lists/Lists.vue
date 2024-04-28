<template>
  <div class="List">
    <div class="ListName">
      <input type="text" v-model="listNameInput" @blur="updateListName(list)" />
      <p class="clickable expandInput removeList" @click="deleteList(list)">
        X
      </p>
    </div>
    <div class="ListContent">
      <ListTasks :list-id="this.listId"></ListTasks>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import ListTasks from "../Tasks/Tasks.vue";

export default {
  name: "WorkPlaceLists",
  components: {
    ListTasks,
  },
  props: {
    listName: String,
    listId: Number,
  },
  data() {
    return {
      listNameInput: this.listName,
      listIdInput: this.listId,
    };
  },
  methods: {
    async updateListName() {
      try {
        const token = Cookies.get("token");
        const response = await axios.put(
          `http://localhost:5236/list/${this.listId}`,
          {
            listId: this.listIdInput,
            listName: this.listNameInput,
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

        if (response.status === 204) {
          console.log("List name updated successfully");
        } else {
          console.error("Failed to update list name");
        }
      } catch (error) {
        console.error("Error updating list name:", error);
      }
    },
    async deleteList() {
      try {
        const token = Cookies.get("token");
        const response = await axios.delete(
          `http://localhost:5236/list/${this.listId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          this.$emit("refreshLists");
          console.log("List deleted successfully");
        } else {
          console.error("Failed to deleted list");
        }
      } catch (error) {
        console.error("Error deleteing list: ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.List {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex;
  background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  width: 40rem;
  .ListName {
    padding: 3rem 0px;
    // width: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 3rem 2rem;
  }
  input {
    transition: 0.2s;
    background: none;
    color: #fff;
    border: none;
    outline: none;
    border-bottom: 1px solid #ffffff73;
    width: 30rem;
  }
}

.ListContent {
  overflow-y: auto;
  max-height: 80vh;
  // width: 100%;
}

.ListContent::-webkit-scrollbar {
  display: none;
}

input:hover,
input:focus {
  border-bottom: 1px solid #ffffff;
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
