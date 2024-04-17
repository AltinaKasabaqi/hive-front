//This is the main page of the file where it has the workplaces, settings for
the user
<template>
  <div class="WorkPlace">
    <div class="navBar">
      <h1>Genc</h1>
      <p>Hive</p>
      <p>Settings</p>
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
</template>
<script>
import WorkPlaces from "./WorkPlaces.vue";

export default {
  name: "WorkPlace",
  components: {
    WorkPlaces,
  },
};
</script>

<style scoped lang="scss">
.WorkPlace {
  width: 100%;
  .navBar,
  .WorkPlaces {
    padding: 5rem 10rem;
  }
  .navBar {
    display: flex;
    align-items: center;
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
