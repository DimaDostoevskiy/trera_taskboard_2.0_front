<template>
  <div class="container">
    <NavbarVue />
    <TaskBoardVue />
  </div>
</template>

<script setup>
import NavbarVue from "@/components/Navbar.vue";
import TaskBoardVue from "@/components/TaskBoard.vue";
</script>

<style scoped>
.container {
  padding: 50px;
}
</style>
