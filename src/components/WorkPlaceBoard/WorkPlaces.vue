// this is the page to for each workspace card
<template lang="">
  <div class="WorkPlaceCard">
    <h3>{{ workplaceName }}</h3>
    <div>
      <p @click="openEditPopup">Edit</p>

      <div class="members">
        <img src="../assets/546b2d4e9bddbcb894fa8e416739339b.jpg" alt="" />
        <img src="../assets/546b2d4e9bddbcb894fa8e416739339b.jpg" alt="" />
        <img src="../assets/546b2d4e9bddbcb894fa8e416739339b.jpg" alt="" />
      </div>
    </div>
  </div>

  <EditWorkPlacePopup
    v-if="showEditPopup"
    @close="showEditPopup = false"
    :workplaceName="workplaceName"
    :members="members"
  />
</template>

<script>
import EditWorkPlacePopup from "../popups/EditWorkPlace/EditWorkPlacePopup";

export default {
  name: "WorkPlace",
  components: {
    EditWorkPlacePopup,
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
  methods: {
    openEditPopup() {
      // Method to toggle visibility of edit popup
      this.showEditPopup = !this.showEditPopup;
    },
  },
};
</script>

<style lang="scss" scoped>
.WorkPlaceCard {
  flex: 1;
  min-width: 20%;
  // border-radius: 1.4rem;
  background-color: #3f3f3f65;
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  gap: 2rem;
  border: 1px solid #fff;
  h3 {
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
@media only screen and (max-width: 890px) {
  .WorkPlaceCard {
    min-width: 100%;
  }
}
</style>
