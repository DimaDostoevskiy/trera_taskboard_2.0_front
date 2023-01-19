<template>
  <nav class="navbar">
    <div class="navbar-panel">
      <div class="projects">
        <div v-for="project in projectList" @click="showBoard(project.id)" :key="project.id"
          :class="{ 'active-project': project.id === storeBoard.activeProjId }" class="project-item">
          {{ project.name }}
          <img @click="deleteProj(project.id)" class="icon" src="../assets/images/g_delete.png" alt="delete" />
        </div>
      </div>
      <div class="controls">
        <a class="btn-create-proj" @click="showCreateProjModal = true">Создать проект
          <img class="icon" src="../assets/images/g_add.png" alt="add" />
        </a>
      </div>
    </div>
    <div class="current-user">
      {{ storeAuth.user?.login }}
      <img class="icon" src="../assets/images/g_gear.png" alt="gear" />
      <img class="icon" @click="logOut" src="../assets/images/g_logut.png" alt="logout" />
    </div>
  </nav>
  <ModalCreateProj :is-show="showCreateProjModal" @close="closeCreateProjModal" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ModalCreateProj from "../components/ModalCreateProj.vue";

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useBoardStore";

import api from "../api/api";

const router = useRouter();
const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

const projectList = ref([]);
const showCreateProjModal = ref(false);

onMounted(async () => {
  projectList.value = await api.getAllProjects(storeAuth.token);
  if (storeBoard.activeProjId) showBoard(storeBoard.activeProjId);
});

const showBoard = (id) => {
  if (storeBoard.activeProjId === id) return;
  storeBoard.loadBoard(storeAuth.token, id);
  localStorage.setItem("activeProjId", id);
};

const closeCreateProjModal = async () => {
  projectList.value = await api.getAllProjects(storeAuth.token);
  showCreateProjModal.value = false;
};

const deleteProj = async (id) => {
  const responseMessage = await api.deleteProject(storeAuth.token, id);
  console.log(responseMessage);
  projectList.value = await api.getAllProjects(storeAuth.token);
};

const logOut = () => {
  storeAuth.logOut();
  router.push("/signin");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 25px 0;
}

.navbar-panel {
  display: flex;
  align-items: center;

  width: 100%;
  height: 64px;

  border-radius: 8px;
  background-color: var(--color-bg-board);
}

.projects {
  display: flex;
  justify-content: flex-start;
  padding: 0 0 0 12px;
  width: 100%;
  border-radius: 8px;
}

.project-item {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 8px;
  width: fit-content;
  white-space: nowrap;
  min-width: 140px;
  height: 35px;
  border-radius: 8px;
  background-color: var(--color-background-secondary);
  cursor: pointer;
}

.current-user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0 8px;
  padding: 12px 20px;
  height: 64px;
  min-width: fit-content;
  right: 0;
  border-radius: 8px;
  background-color: var(--color-bg-board);
}

.controls {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}

.btn-create-proj {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin: 0 auto;
  padding: 0 8px;

  min-width: fit-content;
  height: 35px;

  border-radius: 8px;

  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  background-color: var(--color-background-secondary);
}

.active-project {
  background-color: #3a3a3a;
}

.icon {
  margin-left: 10px;
}
</style>
