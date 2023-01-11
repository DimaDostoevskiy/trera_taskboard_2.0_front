<template>
  <div class="board">
    <div class="column"></div>
    <div class="column"></div>
    <div class="btn">Добавить колонку</div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import api from "../api/api";

// import { useAuthStore } from "@/stores/useAuthStore";
// const storeAuth = useAuthStore();
// const columns = ref([]);

// onMounted(async () => {
//   columns.value = await api.getAllColumns(storeAuth.token, store.activeProjId);
// });
</script>

<style scoped>
.board {
  display: flex;
  justify-content: flex-start;

  padding: 16px;

  min-width: 100%;

  flex-grow: 1;
  border-radius: 8px;
  background-color: var(--color-bg-board);
}
.column {
  
  margin: 0 16px 0 0;

  min-height: 100%;
  width: 300px;
  height: 100%;
  border-radius: 8px;
  background-color: var(--color-bg-column);
}
.btn{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0;
  align-items: center;
  
}
</style>
