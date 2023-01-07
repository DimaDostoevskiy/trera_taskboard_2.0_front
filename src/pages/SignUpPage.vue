<template>
  <div class="signup">
    <div class="card">
      <input class="input" v-model="name" placeholder=" ваше имя" type="text" />
      <div class="validate">
        <span class="validate__message">
          {{ v$.name?.$errors[0]?.$message }}
        </span>
      </div>
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
      <button class="btn" @click="signUp">signup</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
  email,
} from "@vuelidate/validators";

const router = useRouter();

const name = ref("");
const eMail = ref("");
const password = ref("");

const rules = {
  name: {
    minLength: helpers.withMessage(() => "Имя слишком короткое", minLength(4)),
    maxLength: helpers.withMessage(() => "Имя слишком длинное", maxLength(30)),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    $autoDirty: true,
  },
  eMail: {
    required: helpers.withMessage("Поле необходимо заполнить", required),
    email: helpers.withMessage("Некорректный eMail", eMail),
    $autoDirty: true,
  },
  password: {
    minLength: helpers.withMessage(
      () => "Пароль слишком короткий",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      () => "Пароль слишком длинный",
      maxLength(30)
    ),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { name, eMail, password });

const signUp = async () => {
  const response = await api.requestSignUp(
    name.value,
    eMail.value,
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
.card {
  margin: 0 auto;
  padding: 50px;
  background-color: var(--color-bg-board);
}
.input {
  margin: 0px auto;
  border-bottom: 1px solid;
}
.btn {
  margin: 40px auto;
}
.validate {
  height: 30px;
  margin-bottom: 40px;
}
.validate__message {
  color: var(--color-danger);
}
</style>
