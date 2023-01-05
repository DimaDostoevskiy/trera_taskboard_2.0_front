import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("token", () => {
  const token = ref();
  const projectsList = ref([]);
  return { token, projectsList };
});
