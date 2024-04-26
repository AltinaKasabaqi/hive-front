<template>
  <div class="List">
    <div class="ListName">
      <input type="text" v-model="listNameInput" @blur="updateListName(list)" />
      <p class="clickable expandInput removeList" @click="deleteList(list)">
        X
      </p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "WorkPlaceLists",
  props: {
    listName: String,
    listId: Number,
  },
  data() {
    return {
      listNameInput: this.listName,
      listIdInput: this.listId
    }
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
          this.$emit("refreshLists")
          console.log("List deleted successfully");
        } else {
          console.error("Failed to deleted list");
        }
      } catch (error) {
        console.error("Error deleteing list: ", error);
      }
    },
  }
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
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
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

  min-height: 100%;
  background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  width: 40rem; /* Minimum width for each list */
  height: 100%; /* Occupy full height */
  flex-shrink: 0; /* Prevent lists from shrinking */
  background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  overflow: hidden; /* Hide overflow content */
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

.List {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex;
  // width: 10rem;
  // min-height: 100%;
  // background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  overflow: hidden;
  // background: red;
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
