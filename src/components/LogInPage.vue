<template>
  <div class="login-container">
    <form @submit.prevent="submitForm" class="login-form">
      <div v-if="error" class="ErrorLoginpopup">
        {{ error }}
      </div>
      <h1 class="form-title">LogIn</h1>
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
      <button type="submit" class="btn btn-primary expandInput">LogIn</button>
      <p>or</p>
      <router-link to="/signup">
        <button type="submit" class="btn btn-primary expandInput">
          SignUp
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:5236/login", this.formData)
        .then((response) => {
          const token = response.data.token;

          const decodedToken = parseJwt(token);
          const userId = decodedToken.nameid;

          sessionStorage.setItem("userId", userId);

          console.log("Decoded Token: ", decodedToken);
          console.log("User ID:", userId);

          Cookies.set("token", token, { expires: 1 });
          console.log("Tokeni i vendosur në cookie:", token);

          this.$router.push({ name: "workplace" });
        })
        .catch((error) => {
          console.error("Gabim në kyçje", error);
          this.error = "User doesn't exist or password is incorrect";
        });
    },
  },
};

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
</script>

<style lang="scss" scoped>
.ErrorLoginpopup {
  background-color: rgb(224, 75, 75);
  padding: 1rem;
  margin-bottom: 1rem;
}
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
}
.login-form {
  background-color: rgb(255, 255, 255);
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
