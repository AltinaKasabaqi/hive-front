//This is the main page of the file where it has the workplaces, settings for
the user
<template>
  <div class="WorkPlace">
    <div class="navBar">
      <h1>Genc</h1>
      <p>Hive</p>
      <p @click="openSettingsPopup" class="SettingsButton">Settings</p>
    </div>
    <div class="WorkPlaces">
      <WorkPlaces :workplaceName="'Work Space 1'"></WorkPlaces>
      <WorkPlaces :workplaceName="'Work Space 2'"></WorkPlaces>
      <WorkPlaces :workplaceName="'Work Space 3'"></WorkPlaces>
      <WorkPlaces :workplaceName="'Work Space 3'"></WorkPlaces>
      <WorkPlaces :workplaceName="'Work Space 3'"></WorkPlaces>
      <WorkPlaces :workplaceName="'Work Space 4'"></WorkPlaces>
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
import WorkPlaces from "./WorkPlaces.vue";
import SettingsWorkPlacePopup from "../popups/Settings/UserSetting";

export default {
  name: "WorkPlace",
  components: {
    WorkPlaces,
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
      console.log("Settings clicked");
      // Add this line inside the method
      console.log("showSettingsPopup:", this.showSettingsPopup);
      // Method to toggle visibility of edit popup
      this.showSettingsPopup = !this.showSettingsPopup;
    },
  },
};
</script>

<style scoped lang="scss">
.WorkPlace {
  width: 100%;
  .navBar {
    padding: 1.3rem 10rem;
  }
  .navBar {
    display: flex;
    align-items: center;
    // align-items: center;
    justify-content: space-between;
    font-size: var(--font-L);
    // background-color: rgba(255, 0, 0, 0.226);
  }
  .WorkPlaces {
    padding-top: 0rem;
    display: flex;
    align-content: start;
    // gap: 2rem;
    flex-wrap: wrap;
    // background-color: red;
  }
}
.SettingsButton:hover {
  cursor: pointer;
}
@media only screen and (max-width: 890px) {
  .WorkPlace {
    min-width: 100%;
    .navBar,
    .WorkPlace {
      padding: 3rem 5%;
    }
  }
}
</style>
