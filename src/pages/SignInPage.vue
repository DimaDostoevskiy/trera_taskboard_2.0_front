<template>
  <div class="signin">
    <div class="card">
      <TrInput
        inputType="text"
        placeholder="Электронная почта"
        v-model="eMail"
        :validateMessage="v$.eMail?.$errors[0]?.$message"
        @inputSubmit="signIn"
      />
      <TrInput
        inputType="password"
        placeholder="надёжный пароль"
        v-model="password"
        :validateMessage="v$.password?.$errors[0]?.$message"
        @inputSubmit="signIn"
      />
      <button :disabled="v$.$invalid" class="btn" @click="signIn">Войти</button>
      <router-link class="link" to="/signup">Зарегистрироваться</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import TrInput from "@/components/kit/TrInput.vue";

import { useRouter } from "vue-router";
import useAuthStore from "@/stores/useAuthStore";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  maxLength,
  email,
} from "@vuelidate/validators";

import validateMessages from "../config/validateMessages";

const router = useRouter();
const storeAuth = useAuthStore();

const eMail = ref("");
const password = ref("");

// #region validation

const rules = {
  eMail: {
    required: helpers.withMessage(validateMessages.required, required),
    email: helpers.withMessage(validateMessages.email, email),
    $autoDirty: true,
  },
  password: {
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

const v$ = useVuelidate(rules, { eMail, password });

// #endregion

const signIn = async () => {
  if (v$.value.$invalid) return;
  await storeAuth.signIn(eMail.value, password.value);
  if (storeAuth.token) router.push("/");
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

.btn {
  margin: 40px auto 60px auto;
}

.link {
  margin: 0 auto;
}
</style>
