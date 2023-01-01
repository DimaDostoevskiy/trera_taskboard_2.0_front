import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("token", () => {
  const token = ref("");
  return { token };
});
