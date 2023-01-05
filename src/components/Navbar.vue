<template>
  <nav class="navbar">
    <div class="navbar-panel">
      <div class="projects">
        <div
          v-for="project in storeAuth.projectList"
          :key="project.id"
          class="project-item"
        >
          {{ project.name }}
          <img class="icon" src="../assets/images/g_delete.png" alt="delete" />
        </div>
      </div>
      <div class="controls">
        <a class="btn-create-proj" @click="storeModal.isShowModal = true"
          >Создать проект
          <img class="icon" src="../assets/images/g_add.png" alt="add" />
        </a>
      </div>
    </div>
    <div class="current-user">
      current@user.ru
      <img class="icon" src="../assets/images/g_gear.png" alt="gear" />
      <img
        class="icon"
        @click="logOut"
        src="../assets/images/g_logut.png"
        alt="logout"
      />
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/useModalStore";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "../api/api";

const storeModal = useModalStore();
const storeAuth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  storeAuth.projectList = await api.getAllProjects(storeAuth.token);
});
const logOut = () => {
  storeAuth.token = undefined;
  localStorage.clear();
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
.icon {
  margin-left: 10px;
}
</style>
