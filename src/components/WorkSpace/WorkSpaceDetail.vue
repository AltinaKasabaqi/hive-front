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
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
      </div>
      <div class="Tasks">
        <!-- todo leaving the focus of the input to change the database -->
        <input type="text" placeholder="Add a list" value="123" />
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
}
.Tasks {
  min-width: 40rem;
  padding: 3rem 4rem;
  height: 100%;
  background-color: #3f3f3f65;
  border: 1px solid #fff;
  input {
    background: none;
    color: #fff;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    width: 100%;
  }
}
</style>
