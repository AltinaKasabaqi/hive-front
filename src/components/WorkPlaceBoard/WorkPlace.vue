//This is the main page of the file where it has the workplaces, settings for
the user
<template>
  <div class="WorkPlace">
    <div class="navBar">
      <h1 class="clickable">{{ userInfo.userName }}</h1>
      <p class="clickable">Hive</p>
      <p @click="openSettingsPopup" class="SettingsButton">Settings</p>
      <button id="logoutButton" @click="logout">Çkyçu</button>
    </div>
    <div class="WorkPlaces">
      <template v-for="(workplace, index) in workplaces" :key="index">
        <WorkPlaces
          :workplaceName="workplace.workplaceName"
          :wId="workplace.wId"
          :workplaceDescription="workplace.workplaceDescription"
          @refreshWorkplaces="() => { fetchWorkplaces(); fetchCollabs(); }"
        >
        </WorkPlaces>
      </template>
      <template v-for="(workplace, index) in collabs" :key="index">
        <WorkPlaces
          :workplaceName="workplace.workSpace.workspaceName"
          :wId="workplace.workSpace.wId"
          :workplaceDescription="workplace.workSpace.workspaceDescription"
          @refreshWorkplaces="() => { fetchWorkplaces(); fetchCollabs(); }"
        >
        </WorkPlaces>
      </template>
      <AddWorkPlace @refreshWorkplaces="fetchWorkplaces" />
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
import AddWorkPlace from "./AddWorkPlace.vue";
import { parseJwt } from "@/components/Utilities/jwtUtils";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "WorkPlace",
  components: {
    WorkPlaces,
    SettingsWorkPlacePopup,
    AddWorkPlace,
  },
  data() {
    return {
      showSettingsPopup: false,
      members: [],
      workplaces: [],
      collabs: [],
      userInfo: {
        userName: "",
        userEmail: "",
      },
    };
  },
  async mounted() {
    await this.fetchUserInfo();
    this.fetchCollabs();
  },
  created() {
    this.fetchWorkplaces();
    //setInterval(this.fetchWorkplaces, 5000);
  },
  methods: {
    openSettingsPopup() {
      //console.log("Settings clicked");
      console.log("showSettingsPopup:", this.showSettingsPopup);
      // Method to toggle visibility of edit popup
      this.showSettingsPopup = !this.showSettingsPopup;
    },
    async fetchWorkplaces() {
      try {
        const token = Cookies.get("token");

        const decodedToken = parseJwt(token);
        const userId = decodedToken.nameid;

        if (!userId) {
          throw new Error("User does not exist!");
        }

        const url = `http://localhost:5236/workspace/user/${userId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = response.data;
        //console.log("Workplace Data:", data);

        this.workplaces = data.map((workplace) => ({
          wId: workplace.wId,
          workplaceName: workplace.workspaceName,
          workplaceDescription: workplace.workspaceDescription,
        }));
        //console.log("Workplace Data2:", this.workplaces);

        //console.log("Mapped Workplaces:", this.workplaces);
      } catch (error) {
        if (error.response.status === 404) {
          this.workplaces = [];
        } else {
          console.error("Error fetching workplaces:", error.message);
        }
      }
    },
    async fetchCollabs() {
      try {
        const token = Cookies.get("token");
        const userEmail = this.userInfo.userEmail;

        const url = `http://localhost:5236/api/collaborators/by-email/${userEmail}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = response.data;

        this.collabs = data.map(collaborator => ({
          collaboratorId: collaborator.collaboratorId,
          userEmail: collaborator.userEmail,
          wId: collaborator.workSpaceId,
          workSpace: {
            wId: collaborator.workSpaceId,
            workspaceName: collaborator.workSpace.workspaceName,
            workspaceDescription: collaborator.workSpace.workspaceDescription,
            userId: collaborator.workSpace.userId,
          }
        }));

        //console.log("Mapped Workplaces:", this.workplaces);
      } catch (error) {
        if (error.response.status === 404) {
          this.collabs = [];
        } else {
          console.error("Error fetching workplaces:", error.message);
        }
      }
    },
    async fetchUserInfo() {
      try {
        const token = Cookies.get("token");

        const decodedToken = parseJwt(token);
        const userId = decodedToken.nameid;

        if (!userId) {
          throw new Error("User does not exist!");
        }

        const url = `http://localhost:5236/users/${userId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = response.data;

        this.userInfo = {
          userName: data.name,
          userEmail: data.email,
        };

        // Saving for later
        Cookies.set("userEmail", data.email);

      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    },
    logout() {
      Cookies.remove("token");
      this.$router.push("/login");
    },
    conTest() {
      console.log("logfrom workplace.vue");
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
    // gap: 2rem;
    flex-wrap: wrap;
    // background-color: red;
  }
  .WorkPlaces a {
    text-decoration: none;
    color: inherit;
    width: calc(25%);
    margin-bottom: 2rem;
  }
}
// for later animation of the setings page
// .SettingsButton::after {
//   content: "";
//   transition: 0.2s;
//   width: 20%;
//   display: block;
//   height: 2px;
//   background: red;
// }
.SettingsButton:hover {
  cursor: pointer;
}
#logoutButton {
  border: solid 1px gray;
  color: white;
  background-color: rgb(41, 41, 41);
}
@media only screen and (max-width: 1024px) {
  .WorkPlace {
    min-width: 100%;
    .navBar,
    .WorkPlace {
      min-width: 100%;
      padding: 3rem 5%;
    }
    .WorkPlaces a {
      width: calc(50%);
    }
  }
}
@media only screen and (max-width: 480px) {
  .WorkPlace {
    .WorkPlaces a {
      width: calc(100%);
    }
  }
}
</style>
