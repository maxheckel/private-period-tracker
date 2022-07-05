import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isAuthed, logout } from "@/services/accounts";


function redirectIfNotAuthed() {
  if (!isAuthed()) {
    return { name: "sign-up" };
  }
  return true;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/setup",
      name: "setup",
      component: () => import("../views/SetupAccount.vue"),
      beforeEnter: [redirectIfNotAuthed],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      beforeEnter: [redirectIfNotAuthed],
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/logout",
      redirect: () => {
        logout();
        isAuthed();
        return { path: "/" };
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogIn.vue"),
    },
    {
      path: "/changelog",
      name: "changelog",
      component: () => import("../views/ChangeLog.vue"),
    },
  ],
});

export default router;
