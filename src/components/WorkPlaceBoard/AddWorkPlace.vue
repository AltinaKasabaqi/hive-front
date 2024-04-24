// this is the page to for each workspace card
<template lang="">
  <div class="WorkPlaceCard" @click="openEditPopup">
    <h3 class="clickable">+ Add WorkPlace</h3>
  </div>

  <AddWorkPlacePopup
    @updateWorkplacesPage="updateWorkplacesPage"
    v-if="showEditPopup"
    @close="showEditPopup = false"
    :workplaceName="workplaceName"
    :members="members"
  />
</template>

<script>
import AddWorkPlacePopup from "../popups/AddWorkPlace/AddWorkPlacePopup";

export default {
  name: "AddWorkPlace",
  components: {
    AddWorkPlacePopup,
  },
  workplaceName: {
    type: String,
    required: true,
  },
  props: {
    workplaceName: String, // Declare prop for workplace name
  },
  data() {
    return {
      showEditPopup: false,
      members: [],
    };
  },
  emits: ['refreshWorkplaces'],
  methods: {
    openEditPopup() {
      // Method to toggle visibility of edit popup
      this.showEditPopup = !this.showEditPopup;
    },
    updateWorkplacesPage(){
      this.$emit("refreshWorkplaces")
    }
  },
};
</script>

<style lang="scss" scoped>
.WorkPlaceCard {
  flex: 1;
  min-width: 30%;
  // border-radius: 1.4rem;
  background-color: #3f3f3f65;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 10rem;
  gap: 2rem;
  border: 1px solid #fff;
  h3 {
    text-decoration: underline;
    color: #93d890;
    font-size: var(--font-M);
  }
  p {
    font-size: var(--font-S);
  }
  p:hover {
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
}
@media only screen and (max-width: 1600px) {
  .WorkPlaceCard {
    min-width: 30%;
  }
}
@media only screen and (max-width: 1250px) {
  .WorkPlaceCard {
    min-width: 40%;
  }
}
@media only screen and (max-width: 900px) {
  .WorkPlaceCard {
    min-width: 100%;
    padding: 3rem 5rem;
  }
}
</style>
