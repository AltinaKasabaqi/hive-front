//The page to edit specific work places
<template>
  <div class="EditWorkPlaceContainer" @click="closePopup">
    <div class="EditWorkPlacePopup" @click.stop>
      <input
        type=""
        name=""
        v-model="workplaceNameInput"
        placeholder="Entere your Work Place name"
      />

      <input
        type=""
        name=""
        v-model="workplaceDescriptionInput"
        placeholder="Entere your Work Place description"
      />

      <div class="EditWorkPlaceAllMembers">
        <p>Members on this workplace</p>

        <EditWorkPlaceAllMembers
          :userName="''"
          :userProfile="''"
          :member="''"
          :wId="wId"
        ></EditWorkPlaceAllMembers>
      </div>
      <div class="EditWorkPlaceUpdateChanges">
        <button class="WorkPlaceSave expandInput" @click="updateWorkPlace">
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
import Cookies from 'js-cookie';
import axios from 'axios';

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
    wId: {
      type: Number,
      required: true,
    },
    member: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      workplaceNameInput: this.workplaceName,
      workplaceDescriptionInput: this.workplaceDescription,
      
    }
  },
  methods: {
    closePopup(event) {
      if (event.target.classList.contains("EditWorkPlaceContainer")) {
        this.$emit("close");
      }
    },
    async updateWorkPlace() {
      try {
        const url = `http://localhost:5236/workspace/${this.wId}`;
        const token = Cookies.get('token');
        const wId = this.wId;

        const userData = await axios.get(url,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        const data = userData.data;
        const userId = data.user.userId;

        const response = await axios.put(url, {
          wId: wId,
          userId: userId || 0,
          workspaceName: this.workplaceNameInput,
          workspaceDescription: this.workplaceDescriptionInput,
          user: {
            userId: userId || 0,
            email: ''
          }
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        if (response.status === 200) {
          //console.log('Deleting workplace...');
          this.$emit("close");
          this.$emit("updateWorkplacesPage");
        } else {
          const responseData = response.data;
          throw new Error(responseData.message || 'Failed to delete workplace');
        }
      } 
      catch (error) {
        console.error('Error creating workplace:', error.message);
      }
    },
    async deleteWorkPlace() {
      try {
        const url = `http://localhost:5236/workspace/${this.wId}`;
        const token = Cookies.get('token');

        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        if (response.status === 200) {
          //console.log('Deleting workplace...');
          this.$emit("close");
          this.$emit("updateWorkplacesPage");
        } else {
          const responseData = response.data;
          throw new Error(responseData.message || 'Failed to delete workplace');
        }
      } 
      catch (error) {
        console.error('Error creating workplace:', error.message);
      }
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
