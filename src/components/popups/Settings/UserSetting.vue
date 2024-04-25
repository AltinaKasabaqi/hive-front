//The page to edit specific work places
<template>
  <div class="SettingsWorkPlaceContainer" @click="closePopup">
    <div class="SettingsWorkPlacePopup" @click.stop>
      <input
        type=""
        name=""
        v-model="userNameInput"
        placeholder="Enter your new user name"
      />

      <input
        type=""
        name=""
        v-model="userEmailInput"
        placeholder="Enter your new Email"
      />

      <input type="" name="" value="" placeholder="Enter your new Password" />
      <button @click="confirmChanges" class="expandInput">Confirm</button>
    </div>
  </div>
</template>

<script>
import { parseJwt } from "@/components/Utilities/jwtUtils";
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  name: "SettingsWorkPlacePopup",
  components: {},
  props: {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userNameInput: this.userName,
    }
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("SettingsWorkPlaceContainer")) {
        this.$emit("close");
      }
    },
    confirmChanges() {
      // TODO Implement confirmChanges changes logic here
      this.$emit("close");
    },
    async fetchUserInfo(){
      try{
        const token = Cookies.get('token');

        const decodedToken = parseJwt(token);
        const userId = decodedToken.nameid;

        if (!userId){
            throw new Error("User does not exist!")
          }

        const url = `http://localhost:5236/users/${userId}`;

        const response = await axios.get(url , {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        })

        const data = response.data;

        this.userNameInput = data.name;
        this.userEmailInput = data.email;

      }
      catch(error) {
        console.error('Error fetching user info:', error.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.SettingsWorkPlaceContainer {
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
    padding: 1rem 2rem;
    border: none;
    font-size: var(--font-M);
  }

  input {
    transition: 0.2s;
    border-bottom: 1px solid #00000046;
  }
  input:hover,
  input:focus {
    border: none;
    border-bottom: 1px solid #000;
  }

  .SettingsWorkPlacePopup {
    width: 40%;
    background-color: #fff;
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .SettingsWorkPlaceAllMembers {
    background-color: rgba(0, 0, 0, 0.096);
    padding: 3rem 4rem;
  }
  .SettingsWorkPlaceUpdateChanges {
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
  .SettingsWorkPlaceContainer {
    .SettingsWorkPlacePopup {
      width: 50%;
    }
  }
}

@media only screen and (max-width: 890px) {
  .SettingsWorkPlaceContainer {
    .SettingsWorkPlacePopup {
      width: 90%;
    }
    input,
    button {
      font-size: var(--font-S);
    }
  }
}
</style>
