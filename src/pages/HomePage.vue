<template>
  <div class="container">
    <NavbarVue />
    <TaskBoardVue />
  </div>
</template>

<script setup>
import NavbarVue from "../components/Navbar.vue";
import TaskBoardVue from "../components/TaskBoard.vue";

import { onMounted } from "vue";
import { useAuthStore } from "../stores/useAuthStore";

const store = useAuthStore();

onMounted(() => {
  store.token = localStorage.getItem("token");
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 5px;

  width: 100%;
  height: 100vh;

  min-width: 1024px;
  max-width: 1920px;
}
</style>
