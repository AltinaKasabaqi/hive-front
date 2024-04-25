// this is the page to for each workspace card
<template>
  <div class="WorkPlaceCardContainer">
    <router-link :to="{ name: 'workplaceDetail', params: { wId: wId }, props: { wId: wId } }" class="router-link-custom">
      <div class="WorkPlaceCard clickable">
        <h3>{{ workplaceName }}</h3>
        <p>{{ workplaceDescription }}</p>
        <div>
          <p @click.prevent.stop="openEditPopup">Edit</p>

          <div class="members">
            <!-- Member images -->
          </div>
        </div>
      </div>
    </router-link>
    <EditWorkPlacePopup
      @updateWorkplacesPage="updateWorkplacesPage"
      v-if="showEditPopup"
      @close="showEditPopup = false"
      :workplaceName="workplaceName"
      :members="members"
      :workplaceDescription="workplaceDescription"
      :wId="wId"
    />
  </div>
</template>


<script>
import EditWorkPlacePopup from "../popups/EditWorkPlace/EditWorkPlacePopup";

export default {
  name: "WorkPlace",
  components: {
    EditWorkPlacePopup,
  },
  props: {
    workplaceName: String, // Declare prop for workplace name
    wId: Number,
    workplaceDescription: String
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
    updateWorkplacesPage() {
      this.$emit('refreshWorkplaces');
    }
  },
};
</script>

<style lang="scss" scoped>
.router-link-custom {
  text-decoration: none; 
  color: inherit; 
  width: calc(25%);
  margin-bottom: 2rem;
}

.WorkPlaceCardContainer {
  transition: 0.2s;
  flex: 1;
  min-width: 25%;
  border: 1px solid #fff;
  overflow: hidden;
}

.WorkPlaceCard {
  transition: 0.2s;
  // border-radius: 1.4rem;
  background-color: #3f3f3f65;
  display: flex;
  flex-direction: column;
  padding: 3rem 10rem;
  gap: 2rem;
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

.WorkPlaceCardContainer:hover {
  background-color: #ffffff77;
  // transform: scale(0.95);
}

.WorkPlaceCard:hover {
  transform: scale(1.05);
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
  .WorkPlaceCardContainer {
    min-width: 50%;
  }
}
@media only screen and (max-width: 900px) {
  .WorkPlaceCard {
    min-width: 100%;
    padding: 3rem 5rem;
  }
}
@media only screen and (max-width: 480px) {
  .WorkPlaceCardContainer {
    min-width: 100%;
  }
}
</style>
