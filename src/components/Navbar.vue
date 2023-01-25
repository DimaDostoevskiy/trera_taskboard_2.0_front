<template>
  <nav class="navbar">
    <div class="navbar-panel">
      <div class="projects">
        <div
          class="project-item"
          v-for="project in projectList"
          :key="project.id"
          :class="{ 'active-project': project.id === storeBoard.activeProjId }"
          @click="showBoard(project.id)"
        >
          {{ project.name }}
          <img
            class="icon"
            src="../assets/images/g_delete.png"
            alt="delete"
            @click="deleteProj(project.id)"
          />
        </div>
      </div>
      <div class="controls">
        <a class="controls-btn btn-create-proj" @click="showCreateProjModal = true"
          >Создать проект
          <img class="icon" src="../assets/images/g_add.png" alt="add" />
        </a>
        <a class="controls-btn btn-create-proj"
          >Участники проекта
          <img class="icon" src="../assets/images/arrow.png" alt="show" />
        </a>
        <a class="controls-btn btn-create-proj"
          >Добавить участника
          <img class="icon" src="../assets/images/g_add.png" alt="add" />
        </a>
      </div>
    </div>
    <div class="current-user">
      {{ storeAuth.user?.login }}
      <img class="icon" src="../assets/images/g_gear.png" alt="gear" />
      <img
        class="icon"
        src="../assets/images/g_logut.png"
        alt="logout"
        @click="logOut"
      />
    </div>
  </nav>

  <!--  ModalComponent [add project] -->
  <TrModal
    btnText="Создать проект"
    :isDisabled="v$.$invalid"
    :isOpen="showCreateProjModal"
    @mSubmit="createProj"
    @mClose="closeCreateProjModal"
  >
    <template v-slot:modalBody>
      <TrInput
        inputType="text"
        placeholder="Название проекта"
        v-model="newProjName"
        :validateMessage="v$.newProjName?.$errors[0]?.$message"
        @inputSubmit="createProj"
      />
    </template>

  </TrModal>
</template>

<script setup>
import { ref, onMounted } from "vue";

import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";

import { useRouter } from "vue-router";

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useBoardStore";

import api from "@/api/api";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import validateMessages from "@/config/validateMessages";

const router = useRouter();
const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

const projectList = ref([]);
const newProjName = ref("");
const showCreateProjModal = ref(false);

const rules = {
  newProjName: {
    minLength: helpers.withMessage(
      () => validateMessages.minLenght,
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      () => validateMessages.maxLenght,
      maxLength(30)
    ),
    required: helpers.withMessage(validateMessages.required, required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { newProjName });

onMounted(async () => {
  projectList.value = await api.getAllProjects(storeAuth.token);
  if (storeBoard.activeProjId) showBoard(storeBoard.activeProjId);
});

const showBoard = (id) => {
  if (storeBoard.activeProjId === id) return;
  storeBoard.setActiveProjId(id);
  storeBoard.loadBoard(storeAuth.token, id);
  localStorage.setItem("activeProjId", id);
};

const createProj = async () => {
  const response = await api.createProject(storeAuth.token, newProjName.value);
  if (!response) return;
  projectList.value = await api.getAllProjects(storeAuth.token);
  closeCreateProjModal();
};

const deleteProj = async (id) => {
  if (storeBoard.activeProjId === id) {
    storeBoard.activeProjId = undefined;
    localStorage.setItem("activeProjId", undefined);
  }
  const responseMessage = await api.deleteProject(storeAuth.token, id);
  console.log(responseMessage);
  projectList.value = await api.getAllProjects(storeAuth.token);
};

const closeCreateProjModal = () => {
  showCreateProjModal.value = false;
  newProjName.value = "";
  v$.value.$reset();
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
  justify-content: space-around;
  align-items: center;
  margin: 0 8px 0 0;
  padding: 8px;
  width: fit-content;
  white-space: nowrap;
  min-width: 140px;
  height: 35px;
  border-radius: 8px;
  background-color: var(--color-bg-column);
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
  background-color: var(--color-bg-column);
}

.controls {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}

.controls-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-left: 15px;
  padding: 0 12px;

  min-width: fit-content;
  height: 35px;

  border-radius: 8px;

  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  background-color: var(--color-bg-column);
}

.active-project {
  background-color: #4F5263;
}

.icon {
  margin-left: 10px;
  
}
</style>
