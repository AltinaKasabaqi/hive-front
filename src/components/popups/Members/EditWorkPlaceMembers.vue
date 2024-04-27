// to add many users in the edit workplace popup we use this
<template >
  <div class="EditWorkPlaceMembers" v-for="(user, index) in userEmails" :key="index">
    <p class="MemberUsername" > {{ user.userEmail }} </p>
    <div class="MemberPrivilages">
      <button class="removeMember expandInput" @click="removeMember(user.collaboratorId, index)">Remove</button>
    </div>
  </div>
  <div class="EditWorkPlaceMembers">
    <input type="text" v-model="inviteEmail" placeholder="Invite people by email">
    <button @click="inviteUser">Invite</button>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  name: "EditWorkPlaceMembers",
  props: {
    member: Boolean,
    wId: Number,
    userName: String,
    userProfile: String
  },
  data() {
    return {
      userEmails: [],
      inviteEmail: '',
    };
  },
  created() {
    this.fetchCollaborators();
    //setInterval(this.fetchWorkplaces, 5000);
  },
  methods: {
    async inviteUser() {
      try {
        const userEmail  = this.inviteEmail;

        if (!userEmail ) {
          alert("Please enter a username or email to invite.");
          return;
        }

        const url = "http://localhost:5236/api/collaborators";
        const token = Cookies.get('token');

        const response = await axios.post(url, {
          userEmail: userEmail,
          workSpaceId: this.wId,
          workSpace: {
            user: {
              email: ''
            }
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.status === 201) {
          console.log("Invitation sent successfully!");
          this.inviteEmail  = '';
        } else {
          const responseData = response.data;
          throw new Error(responseData.message || 'Failed to send invitation');
        }
      } catch (error) {
        console.error('Error inviting user:', error.message);
        alert("Failed to send invitation. Please try again later.");
      }
    },
    async removeMember(collaboratorId, userIndex) {
      try {
        this.userEmails.splice(userIndex, 1);

        const url = `http://localhost:5236/api/collaborators/${collaboratorId}`;
        const token = Cookies.get('token');

        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        if (response.status !== 200) {
            const responseData = response.data;
            throw new Error(responseData.message || 'Failed to remove member');
        }
      } catch (error) {
          console.error('Error removing member:', error.message);
      }
    },
    async fetchCollaborators() {
      try {
        const url = `http://localhost:5236/api/collaborators/by-workspaceId/${this.wId}`;
        const token = Cookies.get('token');

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });

        if (response.status === 200) {
            const collaborators = response.data;
            collaborators.forEach(userInfo => {
              this.userEmails.push({ collaboratorId: userInfo.collaboratorId, userEmail: userInfo.userEmail });
            });
        } else {
            const responseData = response.data;
            throw new Error(responseData.message || 'Failed to fetch collaborators');
        }
      } catch (error) {
          console.error('Error fetching collaborators:', error.message);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
input,
button {
  padding: 1rem 2rem;
  border: none;
}

label {
  line-height: 0rem;
}

.EditWorkPlaceMembers:hover {
  border-bottom: 3px solid #000;
}
.EditWorkPlaceMembers {
  transition: 0.1s;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid #000;
  align-items: center;
  justify-content: space-between;

  img {
    background-color: rgb(51, 51, 117);
    width: 4rem;
    aspect-ratio: 1/1;
    border-radius: 100%;
  }
  .MemberPrivilages {
    font-size: var(--font-S);
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
    }
  }
  button {
    background-color: rgba(224, 75, 75, 0.644);
  }
}
</style>
