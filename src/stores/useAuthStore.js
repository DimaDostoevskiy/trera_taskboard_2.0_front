import { ref } from "vue";
import { defineStore } from "pinia";
import api from "../api/api";
import parseJwt from "../lib/jwtParser";

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const user = ref({});

  async function signIn(eMail, password) {
    const response = await api.requestSignIn(eMail, password);
    if (!response) return;
    token.value = response;
    user.value = parseJwt(response);
    localStorage.setItem("token", response);
  }

  async function signUp(name, eMail, password) {
    const response = await api.requestSignUp(name, eMail, password);
    if (response) await signIn(eMail, password);
  }

  function logOut() {
    token.value = undefined;
    user.value = null;
    localStorage.clear();
  }

  return { token, user, signIn, signUp, logOut };
});
