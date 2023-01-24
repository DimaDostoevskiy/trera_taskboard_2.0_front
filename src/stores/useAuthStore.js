import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "../api/api";
import parseJwt from "../lib/jwtParser";

export default defineStore("auth", () => {
  const token = ref("");
  const user = computed(() => parseJwt(token.value));

  const signIn = async (eMail, password) => {
    const response = await api.requestSignIn(eMail, password);
    if (!response) return;
    token.value = response;
    localStorage.setItem("token", response);
  };

  const signUp = async (name, eMail, password) => {
    const response = await api.requestSignUp(name, eMail, password);
    if (response) await signIn(eMail, password);
  };

  function logOut() {
    localStorage.clear();
  }

  return { token, user, signIn, signUp, logOut };
});
