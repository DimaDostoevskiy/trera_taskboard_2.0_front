import { ref } from "vue";
import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", () => {
  const token = ref("");
  const userName = ref("");
  const projectsList = ref([]);
  const activeProjId = ref(null)

  return { token, userName, projectsList, activeProjId };
});
