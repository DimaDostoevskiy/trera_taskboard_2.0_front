import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("store", () => {
  const token = ref("");
  const userName = ref("");
  const projectsList = ref([]);
  return { token, userName, projectsList };
});
