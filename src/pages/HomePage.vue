<template>
  <div class="container">
    <CreateProjectModalVue />
    <NavbarVue />
    <TaskBoardVue />
  </div>
</template>

<script setup>
import NavbarVue from "../components/Navbar.vue";
import TaskBoardVue from "../components/TaskBoard.vue";
import CreateProjectModalVue from "./CreateProjectModal.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  padding: 50px;

  width: 100%;
  height: 100vh;

  min-width: 1024px;
  max-width: 1920px;
}
</style>
