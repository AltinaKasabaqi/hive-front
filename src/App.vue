<template>
  <WorkPlace></WorkPlace>
</template>

<script>
import WorkPlace from "./components/WorkPlaceBoard/WorkPlace.vue";

export default {
  name: "App",
  components: {
    WorkPlace,
  },
};
</script>

<style>
body {
  background-color: #121212;
  color: #fff;
}

/* to have consistency */
@import "/src/cssReset/cssReset.css";

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
