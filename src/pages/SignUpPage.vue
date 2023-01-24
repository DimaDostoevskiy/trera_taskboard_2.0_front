<template>
  <div class="signup">
    <div class="card">
      <TrInput
        inputType="text"
        placeholder=" Ваше имя"
        v-model="name"
        :validateMessage="v$.name?.$errors[0]?.$message"
        @inputSubmit="signUp"
      />
      <TrInput
        inputType="text"
        placeholder=" fuck@yandex.ru"
        v-model="eMail"
        :validateMessage="v$.eMail?.$errors[0]?.$message"
        @inputSubmit="signUp"
      />
      <TrInput
        inputType="password"
        placeholder=" надёжный пароль"
        v-model="password"
        :validateMessage="v$.password?.$errors[0]?.$message"
        @inputSubmit="signUp"
      />
      <button :disabled="v$.$invalid" class="btn" @click="signUp">
        Зарегистрироваться
      </button>
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

const name = ref("");
const eMail = ref("");
const password = ref("");

const rules = {
  name: {
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

const v$ = useVuelidate(rules, { name, eMail, password });

const signUp = async () => {
  if (v$.value.$invalid) return;
  await storeAuth.signUp(name.value, eMail.value, password.value);
  if (storeAuth.token) router.push("/");
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
.btn {
  margin: 30px auto;
}
</style>
