<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
body {
  background-color: #121212;
  color: #fff;
}

/* to have consistency */
@import "/src/cssReset/cssReset.css";
.lineInputExpand {
  input {
    outline: none;
    border: none;
    border-bottom: 1px solid #000;
    transition: 0.1s;
  }
}

.lineInputExpand:hover {
  input {
    border-bottom: 3px solid #000;
  }
}

.expandInput {
  cursor: pointer;
  transition: 0.2s;
}

.expandInput:active {
  transform: scale(0.95);
}
.expandInput:hover {
  transform: scale(1.02);
}

.clickable {
  cursor: pointer;
}

:root {
  --font-L: 4rem;
  --font-M: 3rem;
  --font-S: 1.5rem;
}
@media only screen and (max-width: 1600px) {
  :root {
    --font-L: 3.5rem;
    --font-M: 3rem;
    --font-S: 1.5rem;
  }
}
@media only screen and (max-width: 1250px) {
  :root {
    --font-L: 3rem;
    --font-M: 3rem;
    --font-S: 1.5rem;
  }
}
@media only screen and (max-width: 890px) {
  :root {
    --font-L: 3rem;
    --font-M: 2.4rem;
    --font-S: 1.3rem;
  }
}
@media only screen and (max-width: 450px) {
  :root {
    --font-L: 2rem;
    --font-M: 1.5rem;
    --font-S: 1rem;
  }
}
</style>
