import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SignInPage from "@/pages/SignInPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import CreateProjectModal from "@/pages/CreateProjectModal.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInPage,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpPage,
    },
    {
      path: "/project/create",
      name: "modal-create",
      component: CreateProjectModal,
    },
  ],
});

export default router;