<template>
  <div
    class="TaskDetailPopupContainer"
    id="TaskDetailPopupContainer"
    @click="closePopup"
  >
    <div class="TaskDetailPopup" @click.stop>
      <input
        type="text"
        placeholder="Title"
        v-model="localTaskName"
        class="lineInputExpand"
      />
      <input
        type="text"
        placeholder="Description"
        v-model="localTaskDescription"
        class="lineInputExpand TaskDeatilText"
      />
      <input
        type="datetime-local"
        v-model="localTaskEndDate"
        class="lineInputExpand"
      />

      <div class="TaskAssigendMembers"></div>
      <p>Comments</p>

      <div
        class="TaskComments"
        v-for="(taskComment, index) in this.taskComments"
        :key="index"
      >
        <div class="CommentHeader">
          <p>{{ taskComment.userEmail }}</p>
          <p>{{}}</p>
        </div>
        <p>{{ taskComment.comment }}</p>
      </div>
      <input
        type="text"
        placeholder="Add a comment"
        v-model="taskCommentInput"
        @blur="addTaskComment(taskCommentInput)"
      />

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
    taskComment: {
      type: String,
      default: "",
    },
    listId: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
  },
  data() {
    return {
      localTaskName: this.taskName,
      localTaskDescription: this.taskDescription,
      localTaskId: this.taskId,
      localTaskComment: this.taskComment,
      localTaskEndDate: this.endDate,
      localTaskStartDate: this.startDate,
      localListId: this.listId,
      taskComments: [],
      taskCommentInput: "",
    };
  },
  created() {
    this.fetchComments();
    console.log("endDate: ", this.localTaskEndDate);
  },
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("TaskDetailPopupContainer")) {
        this.$emit("close");
      }
    },
    async saveChanges() {
      try {
        const token = Cookies.get("token");

        const newTask = {
          taskId: this.taskId,
          taskName: this.localTaskName,
          taskDescription: this.localTaskDescription,
          endDate: this.localTaskEndDate,
          startDate: this.localTaskStartDate,
          priority: 0,
          listId: this.localListId,
          list: {
            ListName: "",
            WorkSpace: {
              User: {
                email: "",
              },
            },
          },
        };

        console.log("New tASK: ", newTask);

        await axios.put(`http://localhost:5236/task/${this.taskId}`, newTask, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        this.$emit("close");
        this.$emit("refresh-tasks");
      } catch (error) {
        console.error("Error adding task: ", error);
      }
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
    async fetchComments() {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5236/taskcomment/task/${this.localTaskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      this.taskComments = response.data;
    },
    async addTaskComment(taskCommentInput) {
      if (!taskCommentInput) {
        return;
      }
      const userEmail = Cookies.get("userEmail");

      const newTaskComment = {
        taskCommentsId: 0,
        userEmail: userEmail,
        taskId: this.taskId,
        task: {
          list: {
            listName: "",
            workSpace: {
              user: {
                email: "",
              },
            },
          },
        },
        comment: taskCommentInput,
      };

      const token = Cookies.get("token");
      await axios.post(`http://localhost:5236/taskcomment`, newTaskComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      this.taskCommentInput = "";
      this.fetchComments();
    },
  },
};
</script>

<style lang="scss" scoped>
.TaskComments {
  color: #000;
  width: 100%;
  border-bottom: 1px solid #000;

  .CommentHeader {
    display: flex;
    justify-content: space-between;
  }
}
* {
  font-size: 1.5rem;
}
.TaskDetailPopupContainer {
  color: #000;
  z-index: 99;
  background-color: #00000054;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;

  .TaskDetailPopup {
    width: 40%;
    background-color: #fff;
    padding: 3rem 4rem;
    max-height: calc(100% - 100px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    input {
      width: 100%; /* Set the width to fill the container */
      box-sizing: border-box; /* Include padding and border in the element's total width and height */
      resize: none; /* Disable resizing */
      overflow: auto; /* Enable vertical scrolling if needed */
      white-space: normal; /* Allow text wrapping */
    }
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
    font-size: var(--font-S);
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
