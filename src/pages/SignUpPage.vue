<template>
  <div class="signup">
    <div class="card">
      <input class="input" v-model="name" placeholder=" имя" type="text" />
      <div class="validate">
        <span class="validate__message">
          {{ v$.name?.$errors[0]?.$message }}
        </span>
      </div>
      <input
        class="input"
        v-model="eMail"
        placeholder=" fuck@yandex.ru"
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
      <button :disabled="v$.$invalid" class="btn" @click="signUp">
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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

const router = useRouter();
const storeAuth = useAuthStore();

const name = ref("");
const eMail = ref("");
const password = ref("");

// #region validate

const rules = {
  name: {
    minLength: helpers.withMessage(() => "имя слишком короткое", minLength(4)),
    maxLength: helpers.withMessage(() => "имя слишком длинное", maxLength(30)),
    required: helpers.withMessage("поле необходимо заполнить", required),
    $autoDirty: true,
  },
  eMail: {
    minLength: helpers.withMessage(() => "Имя слишком короткое", minLength(4)),
    maxLength: helpers.withMessage(() => "Имя слишком длинное", maxLength(30)),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    email: helpers.withMessage("Некорректный email", email),
    $autoDirty: true,
  },
  password: {
    minLength: helpers.withMessage(
      () => "Пароль слишком короткий",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      () => "Пароль слишком длинный",
      maxLength(12)
    ),
    required: helpers.withMessage("Поле необходимо заполнить", required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { name, eMail, password });
// #endregion validate

const signUp = async () => {
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
.validate {
  height: 30px;
  margin-bottom: 20px;
}
.validate__message {
  color: var(--color-danger);
}
</style>
