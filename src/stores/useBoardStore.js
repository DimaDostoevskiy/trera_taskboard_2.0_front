import { ref } from "vue";
import { defineStore } from "pinia";
import api from "../api/api";

export default defineStore("board", () => {
  const activeProjId = ref(undefined);
  const columnsList = ref([]);
  const cardsList = ref([]);

  const  loadBoard = async (token, id) => {
    activeProjId.value = id;
    columnsList.value = await api.getColumns(token, id);
    cardsList.value = await api.getCards(token, id);
  }

  const createColumn = async (token, name) => {
    if(!activeProjId.value) return;
    const response = await api.createColumn(token, activeProjId.value, name);
    columnsList.value.push(response.column);
  }

  return { activeProjId, columnsList, cardsList, loadBoard, createColumn };
});
