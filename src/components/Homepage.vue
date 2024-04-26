<template>
     <div class="home-page">
    <h1 class="welcome-title">Wlecome to HIVE</h1>
    <p class="subtitle">Streamline Your Workflow: Empower Productivity</p>
    <div class="button">
        <RouterLink to="/signup" class="signup-button">SignUp</RouterLink>
        <RouterLink to="/login" class="login-button">LogIn</RouterLink>
    </div>
  </div>
</template>
<script>
    export default{
        name:'HomePage'
    }
</script>
<style>
     .home-page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: white;
    }
    .welcome-title{
        color: #ffffff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
    }
    .subtitle{
        font-size:1.5rem;
        color: #787777;
        margin-bottom: 2rem;
    }
    .button{
        display: inline;
    }
    .signup-button, .login-button{
        text-decoration: none;
        font-size: 2rem;
        padding: 0.5rem 2rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    .signup-button{
        background-color: #4f4f4f;
        color: white;
        margin-right: 1rem;
    }
    .signup-button:hover{
        background-color: #959595;
    }
    .login-button{
        background-color: #4f4f4f;
        color: white;
    }
    .login-button:hover{
        background-color: #959595;
    }
</style>