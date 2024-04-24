<template>
  <div class="login-container">
    <form @submit.prevent="submitForm" class="login-form">
      <div v-if="errorMessage" class="ErrorLoginpopup">
        {{ errorMessage }}
      </div>
      <h1 class="form-title">SignUp in HIVE</h1>
      <div class="form-group">
        <label for="name">Name:</label>
        <div class="lineInputExpand">
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <div class="lineInputExpand">
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <div class="lineInputExpand">
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="form-control"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary expandInput">SignUp</button>
      <p>or</p>
      <router-link to="/login">
        <button type="button" class="btn btn-primary expandInput">LogIn</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5236/users",
          this.formData
        );
        if (response && response.status === 200) {
          console.log("u regjistru");
          this.$router.push({ name: "LogIn" });
        }
      } catch (error) {
        console.error("Gabim në regjistrim:", error.response.data);
        if (error.response.status === 409) {
          this.errorMessage =
            "Gabime gjatë regjistrimit: " + error.response.data;
        } else {
          this.errorMessage = error.response.data;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
.login-form {
  background-color: #fff;
  padding: 5rem;
  min-width: 50%;
  text-align: center;
}

.form-title {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  background: none;
  width: 97%;
  line-height: 3;
  border: none;
  outline: none;
  border-bottom: 1px solid #000;
}

.btn-primary {
  margin: 1rem 0;
  color: #000;
  width: 97%;
  background-color: rgba(0, 0, 0, 0.096);
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

button:hover {
  background-color: rgb(83, 211, 83);
}

@media only screen and (max-width: 400px) {
  .login-form {
    padding: 2rem;
    width: 100%;
  }
}
</style>
