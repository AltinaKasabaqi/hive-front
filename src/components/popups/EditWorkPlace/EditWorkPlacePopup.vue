//The page to edit specific work places
<template>
  <div class="EditWorkPlaceContainer" @click="closePopup">
    <div class="EditWorkPlacePopup" @click.stop>
      <input
        type=""
        name=""
        :value="workplaceName"
        placeholder="Entere your Work Place name"
      />

      <input
        type=""
        name=""
        :value="workplaceDescription"
        placeholder="Entere your Work Place description"
      />

      <input type="" name="" value="" placeholder="Invite people by username" />
      <button class="expandInput">Add</button>
      <div class="EditWorkPlaceAllMembers">
        <p>Members on this workplace</p>

        <EditWorkPlaceAllMembers
          :userName="'User 1'"
          :userProfile="''"
          :member="'chekced'"
        ></EditWorkPlaceAllMembers>
      </div>
      <div class="EditWorkPlaceUpdateChanges">
        <button class="WorkPlaceSave expandInput" @click="saveChanges">
          Save
        </button>
        <button class="WorkPlaceDelete expandInput" @click="deleteWorkPlace">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EditWorkPlaceAllMembers from "../Members/EditWorkPlaceMembers";
export default {
  name: "EditWorkPlacePopup",
  components: {
    EditWorkPlaceAllMembers,
  },
  props: {
    workplaceName: {
      type: String,
      required: true,
    },
    workplaceDescription: {
      type: String,
    },
    member: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("EditWorkPlaceContainer")) {
        this.$emit("close");
      }
    },
    saveChanges() {
      // TODO Implement saving changes logic here
      this.$emit("close");
    },
    deleteWorkPlace() {
      // TODO Implement deleting workplace logic here
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.EditWorkPlaceContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.548);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  input,
  button {
    outline: none;
    padding: 1rem 2rem;
    border: none;
    font-size: var(--font-M);
  }

  input {
    transition: 0.1s;
    border-bottom: 1px solid #00000054;
  }

  input:hover,
  input:focus {
    border-bottom: 3px solid #000;
  }

  .EditWorkPlacePopup {
    width: 40%;
    background-color: #fff;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .EditWorkPlaceAllMembers {
    background-color: rgba(0, 0, 0, 0.096);
    padding: 3rem 4rem;
  }
  .EditWorkPlaceUpdateChanges {
    display: flex;
    justify-content: space-between;
    .WorkPlaceSave {
      background-color: rgb(83, 211, 83);
    }
    .WorkPlaceDelete {
      background-color: rgb(224, 75, 75);
    }
  }
}

@media only screen and (max-width: 1600px) {
  .EditWorkPlaceContainer {
    .EditWorkPlacePopup {
      width: 70%;
    }
  }
}

@media only screen and (max-width: 890px) {
  .EditWorkPlaceContainer {
    .EditWorkPlacePopup {
      width: 90%;
    }
    input,
    button {
      font-size: var(--font-S);
    }
  }
}
</style>
