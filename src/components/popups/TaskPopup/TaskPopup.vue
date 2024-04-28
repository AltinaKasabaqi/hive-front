<template>
  <div class="TaskDetailPopupContainer" @click="closePopup">
    <div class="TaskDetailPopup" @click.stop>
      <input
        type="text"
        placeholder="Title"
        v-model="localTaskName"
        class="lineInputExpand"
      />
      <input
        type="text"
        placeholder="Content"
        v-model="localTaskDescription"
        class="lineInputExpand"
      />

      <div class="TaskAssigendMembers"></div>
      <div class="TaskComments">
        <div class="CommentHeader">
          <p>User1</p>
          <p>date</p>
        </div>
        <p>This is one comment</p>
      </div>
      <input type="text" placeholder="Add a comment" />

      <div class="EditWorkPlaceUpdateChanges">
        <button class="WorkPlaceSave expandInput" @click="saveChanges">
          Save
        </button>
        <button class="WorkPlaceDelete expandInput" @click="deleteTask">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "TaskPopup",
  props: {
    taskName: {
      type: String,
      default: "",
    },
    taskDescription: {
      type: String,
      default: "",
    },
    taskId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localTaskName: this.taskName,
      localTaskDescription: this.taskDescription,
      localTaskId: this.taskId,
    };
  },
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("TaskDetailPopupContainer")) {
        this.$emit("close");
      }
    },
    saveTask() {
      // TODO Implement saving changes logic here
      this.$emit("close");
    },
    async deleteTask() {
      try {
        const token = Cookies.get("token");
        const response = await axios.delete(
          `http://localhost:5236/task/${this.localTaskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          this.$emit("taskDeleted");
        } else {
          this.$emit("taskDeleted");
          console.error("Failed to delete task");
        }
      } catch (error) {
        console.error("Error deleteing list: ", error);
      }
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.TaskComments {
  color: #000;
  width: 100%;
  .CommentHeader {
    display: flex;
    justify-content: space-between;
  }
}
.TaskDetailPopupContainer {
  z-index: 99;
  background-color: #00000054;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .TaskDetailPopup {
    width: 40%;
    background-color: #fff;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    input {
      outline: none;
      border: none;
      border-bottom: 1px solid #00000069;
    }
  }
  input,
  button {
    padding: 1rem 2rem;
    border: none;
    font-size: var(--font-M);
  }
  .EditWorkPlaceUpdateChanges {
    display: flex;
    justify-content: space-between;
    .WorkPlaceSave {
      cursor: pointer;
      background-color: rgb(83, 211, 83);
    }
    .WorkPlaceDelete {
      cursor: pointer;
      background-color: rgb(224, 75, 75);
    }
  }
}

@media only screen and (max-width: 1600px) {
  .TaskDetailPopupContainer {
    .TaskDetailPopup {
      width: 70%;
    }
  }
}

@media only screen and (max-width: 890px) {
  .TaskDetailPopupContainer {
    .TaskDetailPopup {
      width: 90%;
    }
    input,
    button {
      font-size: var(--font-S);
    }
  }
}
@media only screen and (max-width: 280px) {
  .TaskComments {
    .CommentHeader {
      flex-direction: column;
    }
  }
}
</style>
