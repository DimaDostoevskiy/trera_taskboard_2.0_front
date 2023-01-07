<template>
  <div class="signin">
    <div class="card">
      <input
        class="input"
        v-model="eMail"
        placeholder=" fuck@yandex.com"
        type="text"
      />
      <div class="validate">
        <span class="validate__message">
          {{ v$.eMail?.$errors[0]?.$message }}
        </span>
      </div>
      <input
        class="input"
        v-model="password"
        placeholder=" надёжный пароль"
        type="password"
      />
      <div class="validate">
        <span class="validate__message">
          {{ v$.password?.$errors[0]?.$message }}
        </span>
      </div>
      <button :disabled="v$.$invalid" class="btn" @click="signIn">Войти</button>
      <router-link class="link" to="/signup">Зарегестрироваться</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";

import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/useAppStore";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength, email } from "@vuelidate/validators";

const store = useAppStore();
const router = useRouter();

const eMail = ref("");
const password = ref("");

const rules = {
  eMail: {
    required: helpers.withMessage("Поле необходимо заполнить", required),
    email: helpers.withMessage("Некорректный email", email),
    $autoDirty: true,
  },
  password: {
    minLength: helpers.withMessage(() => "Пароль слишком короткий", minLength(4)),
    maxLength: helpers.withMessage(() => "Пароль слишком длинный", maxLength(30)),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { eMail, password });

const signIn = async () => {
  const response = await api.requestSignIn(eMail.value, password.value);
  if (!response) return;
  store.token = response;
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
  margin: 0 auto;
}
.btn {
  margin: 40px auto 60px auto;
}
.link {
  margin: 0px auto;
}

.validate {
  height: 30px;
  margin-bottom: 30px;
}
.validate__message {
  color: var(--color-danger);
}
</style>
