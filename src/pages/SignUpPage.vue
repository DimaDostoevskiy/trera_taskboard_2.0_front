<template>
  <div class="signup">
    <div class="card">
      <input class="input" v-model="name" placeholder=" Ваше имя" type="text" />
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
      <button class="btn" @click="signUp">Зарегестрироваться</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api/api";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

const signUp = async () => {
  const response = await api.requestSignUp(
    name.value,
    email.value,
    password.value
  );
  if (!response) return;
  router.push("/signin");
};
</script>

<style scoped>
.signup {
  padding-top: 50px;
}
.input {
  margin: 30px auto 0 auto;
  border-bottom: 1px solid;
}
.btn {
  margin: 60px auto;
}
.card{
  margin: 0 auto;
  padding-top: 30px;
  background-color: var(--color-bg-board);
}
</style>
