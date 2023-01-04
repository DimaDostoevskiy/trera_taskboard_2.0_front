<template>
  <div class="modal" v-if="storeModal.isShowModal">
    <div class="owerlay" @click="storeModal.isShowModal = false"></div>
    <div class="card">
      <input
        class="input"
        v-model="projectName"
        placeholder=" Название проекта"
        type="text"
      />
      <!-- TODO: {{ v$.projectName?.$errors[0]?.$message }} -->
      <button :disabled="v$.$invalid" class="btn" @click="createProj">Создать проект</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import api from "@/api/api";

import { useModalStore } from "@/stores/useModalStore";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const projectName = ref("");
const rules = {
  projectName: { required, minLength: minLength(2), $autoDirty: true }, // Matches state.firstName
};

const v$ = useVuelidate(rules, {projectName});
const storeModal = useModalStore();

const createProj = async () => {
  const res = await api.createProject(localStorage.getItem("token"));
  if (res.ok) {
  } else {
    console.log(res.message);
    //TODO: toast show res.message
  }
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
