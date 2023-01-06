<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import router from "@/router/index";

import { useAppStore } from "@/stores/useAppStore";

import api from "@/api/api";

const store = useAppStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    store.token = token;
    store.projectList = await api.getAllProjects(store.token);
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>

<style scoped></style>
