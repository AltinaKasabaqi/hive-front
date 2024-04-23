<template>
    <div>
      <div class="container">
        <h2 class="title">SignUp in HIVE</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="submitForm" class="content">
          <div class="left">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="formData.password" required>
            </div>
                 
            <button type="submit">SignUp</button>
          </div>
          
        </form>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    components: {},
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
        },
        errorMessage: ''
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:5236/users', this.formData);
          if (response && response.status === 200) {
            console.log('u regjistru');
            this.$router.push({ name: 'LogIn' });
          }
        } catch (error) {
   
          console.error('Gabim në regjistrim:', error.response.data);
          if (error.response.status === 409) {
            this.errorMessage = 'Gabime gjatë regjistrimit: ' + error.response.data;
          } else {
            this.errorMessage = error.response.data;
          }
        }
      }
    }
  };
  
  
  </script>
  
  <style scoped>
  .container {
    width: 40%;
    margin: 10% auto;
  }
  
  .title {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    width: calc(100% - 22px); 
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  select {
    width: 100%; 
  }
  
  button {
    display: block;
    width: calc(100% - 22px); 
    padding: 8px;
    background-color: #505050;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px; 
  }
  
  button:hover {
    background-color: #333333;
  }
  
  .alert {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }

 

  </style>