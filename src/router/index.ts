import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/sign-up",
      name: "signup",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/log-in",
      name: "login",
      component: () => import("../views/LogIn.vue"),
    },
  ],
});

export default router;
