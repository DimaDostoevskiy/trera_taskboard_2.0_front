<template>
  <div class="modal" v-if="isShow">
    <div class="owerlay" @click="close"></div>
    <div class="card">
      <input
        class="input"
        :class="{ input__error: v$.projectName?.$errors?.length }"
        v-model="projectName"
        placeholder=" Название проекта"
        type="text"
      />
      <div class="validate">
        <span class="validate__message">
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
import { ref, defineProps, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";

import { useAuthStore } from "@/stores/useAuthStore";

import api from "../api/api";
import validateMessages from "../config/validateMessages";

const storeAuth = useAuthStore();
const props = defineProps(["is-show"]);
const emit = defineEmits(["close", "update"]);

const projectName = ref();

// #region validation
const rules = {
  projectName: {
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

const v$ = useVuelidate(rules, { projectName });
// #endregion

const createProj = async () => {
  const response = await api.createProject(storeAuth.token, projectName.value);
  if (!response) return;
  console.log(response);
  emit("update");
  close();
};

const close = () => {
  projectName.value = "";
  v$.value.$reset();
  emit("close");
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
  z-index: 5;
}
.modal {
  z-index: 5;
}
.card {
  margin-top: 150px;
  padding: 0 50px;
  z-index: 5;
}
.input {
  margin: 100px auto 0px auto;
}
.validate {
  height: 30px;
  margin-bottom: 60px;
}
.validate__message {
  color: var(--color-danger);
}
.btn {
  margin-bottom: 100px;
}
</style>
