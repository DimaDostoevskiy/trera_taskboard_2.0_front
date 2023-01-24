<template>
  <div class="container">
    <Navbar />
    <TaskBoard />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import TaskBoard from "@/components/TaskBoard.vue";
</script>

<style scoped>
.container {
  padding: 50px;
}
</style>
