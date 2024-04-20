<template>
  <div class="workSpaceLists">
    <div class="topBarContainer">
      <div class="topBar">
        <!-- todo take the name as a prop -->
        <h4>workSpaceName</h4>
        <p @click="openSettingsPopup">Settings</p>
      </div>
    </div>
    <div class="Lists">
      <div class="List">
        <div class="ListName">
          <!-- todo leaving the focus of the input to change the database -->
          <input type="text" placeholder="Add a list" value="todo" />
          <p>X</p>
        </div>
        <!-- todo make this into a another file and import it -->
        <div class="Task">
          <p class="Title">
            Title of the task and this can be as long as possible
          </p>
          <div>
            <div class="members">
              <img
                src="../assets/546b2d4e9bddbcb894fa8e416739339b.jpg"
                alt=""
              />
              <img
                src="../assets/546b2d4e9bddbcb894fa8e416739339b.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="List ListAdd">
        <div class="ListName">
          <!-- todo leaving the focus of the input to change the database -->
          <input type="text" placeholder="Add a list" />
        </div>
      </div>
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
import SettingsWorkPlacePopup from "../popups/EditWorkPlace/EditWorkPlacePopup";
export default {
  name: "WorkPlaceDetail",
  components: {
    SettingsWorkPlacePopup,
  },
  data() {
    return {
      showSettingsPopup: false,
      members: [],
    };
  },
  methods: {
    openSettingsPopup() {
      this.showSettingsPopup = !this.showSettingsPopup;
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
  width: 100%;
  height: 100%;
  display: flex;
  overflow: scroll;
  // overflow: hidden;
}
.List {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex;
  max-width: 40rem;

  min-height: 100%;
  background-color: #3f3f3f65;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  .Task {
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
    input {
      background: none;
      color: #fff;
      border: none;
      outline: none;
      border-bottom: 1px solid #fff;
      width: 80%;
    }
  }
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
</style>
