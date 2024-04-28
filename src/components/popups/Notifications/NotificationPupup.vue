<template lang="">
  <div
    class="NotificationPopupContainer"
    :class="{ active: showNotificationPopup }"
    @click="closeNotificationPopup"
  >
    <div class="NotificationCenter" @click.stop>
      <!-- search from here -->
      <input type="" name="" value="" placeholder="Search " />
      <div class="NotificationsDetailContainer">
        <div class="NotificaonsDetail">
          <p>Task Name Name WorkSpace WorkSpace WorkSpace</p>
          <p>WorkSpace</p>
          <p>29.04.2024</p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="NotificationIcon"
    :style="{
      '--notification-bg-color':
        notificationCount > 0 ? 'rgb(127, 50, 50)' : 'rgb(51, 174, 55)',
    }"
    @click="toggleNotificationPopup"
  >
    {{ notificationCount }}
  </div>
</template>

<script>
export default {
  name: "NotificationPopup",
  data() {
    return {
      notificationCount: 1,
      showNotificationPopup: false,
    };
  },
  methods: {
    toggleNotificationPopup() {
      this.showNotificationPopup = !this.showNotificationPopup;
    },
    closeNotificationPopup() {
      this.showNotificationPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.NotificationIcon {
  cursor: pointer;
  transition: 0.2s;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--notification-bg-color, rgb(51, 174, 55));
  min-width: 4rem;
  aspect-ratio: 1/1;
  border-radius: 100%;
}

.NotificationPopupContainer {
  display: none;
}
.NotificationPopupContainer.active {
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.548);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .NotificationsDetailContainer {
    width: 100%;
    height: 40rem;
    overflow: auto;
  }
  .NotificationCenter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    color: #000;
    width: 70%;
    padding: 3rem 4rem;
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
    }
    .NotificaonsDetail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #000;
      p {
        flex: 1;
        text-align: center;
      }
    }
  }
}

@media only screen and (max-width: 890px) {
  .NotificationPopupContainer.active {
    .NotificationCenter {
      .NotificaonsDetail {
        flex-direction: column;
        gap: 3rem;
      }
    }
  }
}
</style>
