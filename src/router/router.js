
import { createRouter, createWebHashHistory } from 'vue-router';




const routes = [
    {
      path: "/",
      name: "homepage",
      component: () => import("../components/Homepage.vue"),
    },
    {
        path: "/workplace",
        name: "workplace",
        component: () => import("../components/WorkPlaceBoard/WorkPlace.vue"),
      },
      
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router;