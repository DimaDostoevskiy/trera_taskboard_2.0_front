<template>
  <div class="container">
    <NavbarVue @createProjectModal="isCreateOpened = true" />
    <TaskBoardVue />
    <CreateProjectModalVue 
      :is-opened="isCreateOpened" 
      @close="isCreateOpened = false"/>
    
  </div>
</template>

<script setup>
import NavbarVue from "../components/Navbar.vue";
import TaskBoardVue from "../components/TaskBoard.vue";
import CreateProjectModalVue from "./CreateProjectModal.vue";

import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/api/api";

const store = useAuthStore();
const projectList = ref([]);
const isCreateOpened = ref(true);

onMounted(() => {
  store.token = localStorage.getItem("token");
  projectList.value = api.getAllProjects(store.token);
});
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
