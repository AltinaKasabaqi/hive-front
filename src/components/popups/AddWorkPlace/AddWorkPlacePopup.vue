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
        v-model="workspaceDescriptionInput"
        placeholder="Entere your Work Place description"
      />
      <div class="EditWorkPlaceUpdateChanges">
        <button class="WorkPlaceSave expandInput" @click="createWorkplace">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { parseJwt } from "@/components/Utilities/jwtUtils";
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  name: "AddWorkPlacePopup",
  data() {
    return {
      workplaceNameInput: this.workplaceName || '', 
      workspaceDescriptionInput: this.workplaceDescription || '',
      };
  },
  components: {
  },
  props: {
    workplaceName: {
      type: String,
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
    async createWorkplace() {
      try {
        const token = Cookies.get('token');
        const decodedToken = parseJwt(token);
        const userId = decodedToken.nameid;
        const url = `http://localhost:5236/workspace`;

        const response = await axios.post(url, {
          userId: userId || 0,
          workspaceName: this.workplaceNameInput,
          workspaceDescription: this.workspaceDescriptionInput,
          user: {
            userId: userId || 0,
            email: ''
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        if (response.status === 200) {
          this.$emit("close");
          this.$emit("updateWorkplacesPage");
        }
        else {
          throw new Error(response.data.message || 'Failed to create workplace');
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
