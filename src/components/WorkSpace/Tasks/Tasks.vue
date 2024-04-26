<template>
  <!-- todo make this into a another file and import it -->
  <div class="Task expandInput" @click="openTaskDetail">
    <p class="Title">Title of the task and this can be as long as possible</p>
    <div>
      <div class="members"></div>
    </div>
  </div>

  <SettingsWorkPlacePopup
    v-if="showSettingsPopup"
    @close="showSettingsPopup = false"
    :workplaceName="workplaceName"
    :members="members"
  />
</template>

<script>
import SettingsWorkPlacePopup from "../../popups/EditWorkPlace/EditWorkPlacePopup";

export default {
  name: "ListTasks",
  components: {
    SettingsWorkPlacePopup,
  },
  data() {
    return {
      showSettingsPopup: false,
    };
  },
  methods: {
    openTaskDetail() {
      this.showTaskDetail = !this.showTaskDetail;
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
