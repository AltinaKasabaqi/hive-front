<template>
  <div class="TaskDetailPopupContainer" @click="closePopup">
    <div class="TaskDetailPopup" @click.stop>
      <!-- todo taking the value from the objects in api -->
      <input type="text" placeholder="Title" value="" />
      <input type="text" placeholder="Content" value="" />
      <!-- todo add options to select members -->
      <div class="EditWorkPlaceUpdateChanges">
        <button class="WorkPlaceSave" @click="saveChanges">Save</button>
        <button class="WorkPlaceDelete" @click="deleteWorkPlace">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskPopup",
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("TaskDetailPopupContainer")) {
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

<style lang="scss" scoped>
.TaskDetailPopupContainer {
  background-color: #00000054;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .TaskDetailPopup {
    width: 40%;
    background-color: #fff;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    input {
      outline: none;
      border: none;
      border-bottom: 1px solid #00000069;
    }
  }
  input,
  button {
    padding: 1rem 2rem;
    border: none;
    font-size: var(--font-M);
  }
  .EditWorkPlaceUpdateChanges {
    display: flex;
    justify-content: space-between;
    .WorkPlaceSave {
      cursor: pointer;
      background-color: rgb(83, 211, 83);
    }
    .WorkPlaceDelete {
      cursor: pointer;
      background-color: rgb(224, 75, 75);
    }
  }
}

@media only screen and (max-width: 1600px) {
  .TaskDetailPopupContainer {
    .TaskDetailPopup {
      width: 70%;
    }
  }
}

@media only screen and (max-width: 890px) {
  .TaskDetailPopupContainer {
    .TaskDetailPopup {
      width: 90%;
    }
    input,
    button {
      font-size: var(--font-S);
    }
  }
}
</style>
