import { ref } from "vue";
import { defineStore } from "pinia";
import api from "../api/api";

export const useBoardStore = defineStore("board", () => {
  const activeProjId = ref(undefined);
  const columnsList = ref([]);
  const cardsList = ref([]);

  async function loadBoard(id) {
    activeProjId.value = id;
    columnsList.value = await api.getColumns(id);
    // cardsList.value = await api.getColumns(id);
  }

  return { activeProjId, columnsList, cardsList, loadBoard };
});
