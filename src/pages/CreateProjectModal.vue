<template>
  <div class="modal" v-if="storeModal.isShowModal">
    <div class="owerlay" @click="close"></div>
    <div class="card">
      <input
        class="input"
        :class="{ input__error: v$.$invalid }"
        v-model="projectName"
        placeholder=" Название проекта"
        type="text"
      />
      <!-- TODO: {{ v$.projectName?.$errors[0]?.$message }} -->
      <button :disabled="v$.$invalid" class="btn" @click="createProj">
        Создать проект
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";

import { useModalStore } from "@/stores/useModalStore";
import { useAuthStore } from "@/stores/useAuthStore";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const projectName = ref();
const storeAuth = useAuthStore();

const rules = {
  projectName: { required, minLength: minLength(5), $autoDirty: true },
};

const v$ = useVuelidate(rules, { projectName });
const storeModal = useModalStore();

const close = () => {
  storeModal.isShowModal = false;
};

const createProj = async () => {
  const res = await api.createProject(storeAuth.token, projectName.value);
  if (!res) return;
  console.log(res.message);
  storeAuth.projectList = await api.getAllProjects(storeAuth.token);
  projectName.value = "";
  close();
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.owerlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(100, 100, 100, 0.5);
  z-index: 1;
}
.modal {
  z-index: 1;
}
.card {
  margin-top: 150px;
  padding: 0 50px;
  z-index: 1;
}
.input {
  margin: 100px auto 100px auto;
}
.btn {
  margin: 0px auto 50px auto;
}
</style>
