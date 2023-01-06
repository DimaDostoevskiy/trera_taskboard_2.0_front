<template>
  <div class="modal" v-if="storeModal.isShowModal">
    <div class="owerlay" @click="close"></div>
    <div class="card">
      <input
        class="input"
        :class="{ input__error: v$.projectName?.$errors?.length }"
        v-model="projectName"
        placeholder=" Название проекта"
        type="text"
      />
      <div class="error-message">
        <span class="error__label">
          {{ v$.projectName?.$errors[0]?.$message }}
        </span>
      </div>
      <button class="btn" :disabled="v$.$invalid" @click="createProj">
        Создать проект
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";

import { useAppStore } from "@/stores/useAppStore";
import { useModalStore } from "@/stores/useModalStore";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";

const store = useAppStore();
const storeModal = useModalStore();

const projectName = ref();

const rules = {
  projectName: {
    minLength: helpers.withMessage(() => "Имя слишком короткое", minLength(4)),
    maxLength: helpers.withMessage(() => "Имя слишком длинное", maxLength(30)),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { projectName });

async function createProj() {
  const res = await api.createProject(store.token, projectName.value);
  if (!res) return;
  console.log(res);
  store.projectList = await api.getAllProjects(store.token);
  close();
}

function close() {
  projectName.value = "";
  storeModal.isShowModal = false;
  v$.value.$reset();
}
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
  margin: 100px auto 5px auto;
}
.error-message {
  height: 30px;
}
.error__label {
  color: var(--color-danger);
}
.btn {
  margin: 70px auto 50px auto;
}
</style>
