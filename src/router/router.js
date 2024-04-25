import { createRouter, createWebHashHistory } from "vue-router";
import authorizeMiddleware from "../authorization/auth";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: () => import("../components/Homepage.vue"),
    meta: { requiresAuth: false}
  },
  {
    path: "/workplace",
    name: "workplace",
    component: () => import("../components/WorkPlaceBoard/WorkPlace.vue"),
    meta: { requiresAuth: false}
  },
  {
    path: "/workplace/detail/:wId",
    name: "workplaceDetail",
    component: () => import("../components/WorkSpace/WorkSpaceDetail.vue"),
    meta: { requiresAuth: false}
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => import("../components/LogInPage.vue"),
    meta: { requiresAuth: false}
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../components/SignUpForm.vue"),
    meta: { requiresAuth: false}
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((authorizeMiddleware))

export default router;
