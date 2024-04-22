// to add many users in the edit workplace popup we use this
<template>
  <div class="EditWorkPlaceMembers">
    <img
      src="../../assets/546b2d4e9bddbcb894fa8e416739339b.jpg"
      alt="profile"
    />
    <p class="MemberUsername">user1</p>
    <div class="MemberPrivilages">
      <div>
        <label for="removeMember"> Member</label><br />
        <input type="checkbox" :checked="member" />
      </div>
      <button class="removeMember expandInput">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditWorkPlaceMembers",
  props: {
    member: Boolean, // Declare prop for workplace name
  },
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
