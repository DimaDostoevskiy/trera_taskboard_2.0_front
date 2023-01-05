<template>
  <div class="signin">
    <div class="card">
      <input
        class="input"
        v-model="email"
        placeholder=" fuck@yandex.com"
        type="text"
      />
      <input
        class="input"
        v-model="password"
        placeholder=" надёжный пароль"
        type="password"
      />
      <button class="btn" @click="signIn">Войти</button>
      <router-link class="link" to="/signup">Зарегестрироваться</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const storeAuth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const signIn = async () => {
  const response = await api.requestSignIn(email.value, password.value);
  if (!response) return;
  storeAuth.token = response;
  localStorage.setItem("token", response);
  router.push("/");
};
</script>

<style scoped>
.signin {
  padding-top: 50px;
}
.card {
  margin: 0 auto;
  padding: 50px;
}
.input {
  margin: 0px auto 40px auto;
}
.btn {
  margin: 40px auto 60px auto;
}
.link {
  margin: 0px auto;
}
</style>
