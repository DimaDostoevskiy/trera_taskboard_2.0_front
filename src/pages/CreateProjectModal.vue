<template>
  <div v-if="isOpened" class="modal-wrapper">
    <div class="modal">
      <div class="card">
        <input
          class="input"
          :class="{ input__error: hasError }"
          v-model="name"
          placeholder=" Название проекта"
          type="text"
        />
        <button class="btn" @click="createProj">Создать проект</button>
      </div>
    </div>
    <div @click="close" class="overlay"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import api from "@/api/api";

import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
defineProps(["isOpened"]);

const router = useRouter();

const name = ref("");
const hasError = ref(true);

const createProj = async () => {
  if (name.value.length < 6) {
    hasError.value = !hasError.value;
    console.log("в имени недостаточно символв");
  }
  const res = await api.createProject(
    localStorage.getItem("token"),
    name.value
  );
  if (res.ok) {
    console.log(res.message);
    router.push("/");
  } else {
    console.log(res.message);
    //TODO: toast show res.message
  }
};

const close = () => {
  console.log(`emit('close')`);
  emit("close");
};
</script>

<style scoped>
.card {
  padding: 0 50px;
}
.input {
  margin: 100px auto 100px auto;
}

.btn {
  margin: 0px auto 50px auto;
}

.modal-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.4;
}
.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
}
</style>
