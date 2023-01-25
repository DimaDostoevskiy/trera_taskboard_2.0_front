import { ref } from "vue";
import { defineStore } from "pinia";
import api from "../api/api";

export default defineStore("board", () => {
  const activeProjId = ref(0);
  const columnsList = ref([]);
  const tasksList = ref([]);

  const setActiveProjId = (id) => {
    activeProjId.value = parseInt(id);
  };

  const loadBoard = async (token, id) => {
    if (!activeProjId.value) return;
    setActiveProjId(id);
    columnsList.value = await api.getColumns(token, id);
  };

  const createColumn = async (token, name) => {
    if (!activeProjId.value) return;
    const response = await api.createColumn(token, activeProjId.value, name);
    columnsList.value.push(response.column);
  };

  const createTask = async (token, name, summery, description, column_id) => {
    const response = await api.createTask(token, name, summery, description, column_id);
    tasksList.value.push(response.card);
  };

  return {
    activeProjId,
    columnsList,
    tasksList,
    setActiveProjId,
    loadBoard,
    createColumn,
    createTask
  };
});
