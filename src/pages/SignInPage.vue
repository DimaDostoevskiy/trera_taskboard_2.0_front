<template>
  <div class="signin">
    <div class="card">
      <TrInput
        inputType="text"
        placeholder=" электронная почта"
        v-model="eMail"
        :validateMessage="v$.eMail?.$errors[0]?.$message"
        @inputSubmit="signIn"
      />
      <TrInput
        inputType="password"
        placeholder=" надёжный пароль"
        v-model="password"
        :validateMessage="v$.password?.$errors[0]?.$message"
        @inputSubmit="signIn"
      />
      <button :disabled="v$.$invalid" class="btn" @click="signIn">Войти</button>
      <div class="link-wrapper">
        <router-link class="link" to="/signup">Зарегистрироваться</router-link>
      </div>
      
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

import validateMessages from "@/config/validateMessages";

const router = useRouter();
const storeAuth = useAuthStore();

const eMail = ref("");
const password = ref("");

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
  min-width: 330px;
  font-size: 20px;
  color: var(--color-link);
  background-color: var(--column-bg-black);
}

.btn:hover {
  color: var(--color-text-primary);
  background-color: var(--column-bg-black);
}
.btn:disabled {
  opacity: 1;
  cursor: auto;
}
.btn:disabled:hover {
  background-color: var(--color-btn);
}

.link-wrapper {
  height: 42px;
  
  display: flex;
  align-items: center;
  background-color: var(--column-bg-black);
  
  border-radius: 6px;
  border: 1px solid rgb(136, 136, 136);
}

.link {
  margin: 0 auto;
  color: var(--color-link);
}
</style>
