<template>
  <div
    :class="getTaskClass(task)"
    class="expandInput"
    v-for="(task, index) in this.tasks"
    :key="index"
  >
    <button @click.stop="moveTaskLeft(task)" class="moveButton expandInput">
      &lt;
    </button>
    <div class="TaskDetail">
      <p class="Title" @click="openTaskDetail(task)">{{ task.taskName }}</p>
    </div>
    <button @click.stop="moveTaskRight(task)" class="moveButton expandInput">
      &gt;
    </button>
    <div>
      <div class="members"></div>
    </div>
  </div>

  <input
    class="Task TaskAdd"
    type="text"
    v-model="taskNameInput"
    placeholder="+ Add a task"
    @blur="addTask"
  />

  <TaskPopup
    @taskDeleted="fetchTasks"
    v-if="showTaskDetail"
    @close="showTaskDetail = false"
    :taskName="selectedTask.taskName"
    :taskDescription="selectedTask.taskDescription"
    :taskId="selectedTask.taskId"
    :endDate="selectedTask.endDate"
    :startDate="selectedTask.startDate"
    :listId="selectedTask.listId"
    @refresh-tasks="forceRerender"
  />
</template>

<script>
import TaskPopup from "@/components/popups/TaskPopup/TaskPopup.vue";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "ListTasks",
  props: ['listId', 'forceUpdateKey'],
  components: {
    TaskPopup,
  },
  emits: ['refreshTasks'],
  data() {
    return {
      showTaskDetail: false,
      tasks: [],
      taskNameInput: "",
      listIds: [],
      customDate: "2999-04-27",
      keyIncrement: 0
    };
  },
  watch: {
    forceUpdateKey() {
      this.keyIncrement++;
    }
  },
  created() {
    this.fetchTasks();
    this.fetchListsIds();
    //setInterval(this.fetchListsIds, 1850);
    //setInterval(this.fetchTasks, 2000);
  },
  methods: {
    getTaskClass(task) {
      const today = new Date();
      const dueDate = new Date(task.endDate);

      if (dueDate < today) {
        return "Task overdue"; // Apply red styling
      } else if (
        dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        return "Task approaching-deadline";
      } else {
        return "Task";
      }
    },
    openTaskDetail(task) {
      this.showTaskDetail = !this.showTaskDetail;

      if (this.showTaskDetail) {
        this.selectedTask = task;
      }
    },
    async fetchTasks() {
      try {
        //console.log("YYEET")
        const token = Cookies.get("token");

        const response = await axios.get(
          `http://localhost:5236/task/list/${this.listId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        this.tasks = response.data;
        console.log("TRUE RESPONE.DATA: ", response.data)
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      try {
        if (!this.taskNameInput) {
          return;
        }
        const token = Cookies.get("token");

        const newTask = {
          taskName: this.taskNameInput,
          taskDescription: "",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          priority: 0,
          listId: this.listId,
          list: {
            ListName: "",
            WorkSpace: {
              User: {
                email: "",
              },
            },
          },
        };

        const response = await axios.post(
          `http://localhost:5236/task`,
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          this.fetchTasks();
          this.taskNameInput = "";
        } else {
          this.fetchTasks();
          this.taskNameInput = "";
        }
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    },
    async fetchListsIds() {
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
        this.listIds = data.map((List) => ({
          listId: List.listId,
        }));
        //console.log("lists: ", this.listIds)
      } catch (error) {
        if (error.response.status === 404) {
          this.lists = [];
        } else {
          console.error("Error fetching lists:", error.message);
        }
      }
    },
    async moveTaskLeft(task) {
      try {
        const token = Cookies.get("token");

        const currentIndex = this.listIds.findIndex(
          (item) => item.listId === this.listId
        );
        console.log(task.listId);
        let newListId;

        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          newListId = this.listIds[newIndex].listId;

          task.listId = newListId;

          await axios.put(
            `http://localhost:5236/task/${task.taskId}/move/${newListId}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          //this.fetchListsIds();
          this.$emit("refresh-tasks");
        }
      } catch (error) {
        console.error("Error moving task left:", error);
      }
    },
    async moveTaskRight(task) {
      try {
        const token = Cookies.get("token");

        console.log(task.taskId);

        const currentIndex = this.listIds.findIndex(
          (item) => item.listId === this.listId
        );
        let newListId;

        if (currentIndex < this.listIds.length - 1) {
          const newIndex = currentIndex + 1;
          newListId = this.listIds[newIndex].listId;

          await axios.put(
            `http://localhost:5236/task/${task.taskId}/move/${newListId}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          //this.fetchTasks();
          this.$emit("refresh-tasks");
        }
      } catch (error) {
        console.error("Error moving task left:", error);
      }
    },
    forceRerender() {
      this.$emit("refresh-tasks");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  margin: 0;
  display: block;
}
.expandInput button:hover {
  transform: scale(1.4);
}
.Task:active {
  transform: scale(0.95);
}
.Task {
  transition: 0.1s;
  cursor: pointer;
  width: 100%;
  // border-top: 1px solid #fff;
  border: 1px solid #fff;
  padding: 3rem 4rem;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .TaskDetail {
    text-align: center;
    width: 100%;
  }
  .moveButton {
    background: none;
    color: #fff;
    border: none;
    outline: none;
  }
}

.Task:hover {
  background-color: #696969;
}

input {
  transition: 0.2s;
  background: none;
  color: #fff;
  border: none;
  outline: none;
  border-bottom: 1px solid #696969;
  width: 80%;
}
input:hover,
input:focus {
  border-bottom: 1px solid #ffffff;
}
input {
  border-bottom: 1px solid #fff;
}
.Task.overdue {
  background-color: rgb(143, 49, 49); /* Red for overdue tasks */
}
.Task.approaching-deadline {
  background-color: rgb(
    140,
    140,
    66
  ); /* Yellow for tasks approaching the deadline */
}
</style>
