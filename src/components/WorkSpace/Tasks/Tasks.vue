<template >
  <div class="Task expandInput" @click="openTaskDetail(task)" v-for="(task, index) in this.tasks" :key="index">
    <p class="Title"> {{ task.taskName }} </p>
    <div>
      <div class="members"></div>
    </div>
  </div>

  <input type="text" v-model="taskNameInput" @blur="addTask" />

  <TaskPopup
    @taskDeleted="fetchTasks"
    v-if="showTaskDetail"
    @close="showTaskDetail = false"
    :taskName="selectedTask.taskName"
    :taskDescription="selectedTask.taskDescription"
    :taskId="selectedTask.taskId"
  />
</template>

<script>
import TaskPopup from '@/components/popups/TaskPopup/TaskPopup.vue';
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "ListTasks",
  props: {
    listId: {
      type: Number,
      required: true,
    },
  },
  components: {
    TaskPopup,
  },
  data() {
    return {
      showTaskDetail: false,
      tasks: [],
      taskNameInput: ''
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    openTaskDetail(task) {
      this.showTaskDetail = !this.showTaskDetail;

      if (this.showTaskDetail) {
      this.selectedTask = task;
      }
    },
    async fetchTasks() {
      try {
        const token = Cookies.get("token");

        const response = await axios.get(`http://localhost:5236/task/list/${this.listId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      try {
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
              email: ""
            }
          }
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
          this.taskNameInput="";
        } else {
          this.fetchTasks();
          this.taskNameInput="";
        }
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// todo hide the scroll bar

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

  // border-top: 1px solid #fff;
  border: 1px solid #fff;
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
  .List {
    min-width: 30rem;
  }
}
</style>
