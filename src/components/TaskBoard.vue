<template>
  <div class="board">
    <h1>board</h1>
  </div>
</template>

<script setup>
import { useAppStore } from "../stores/useAppStore";
const store = useAppStore();
</script>

<style scoped>
.board {
  padding: 15px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  border-radius: 8px;
  background-color: var(--color-bg-board);
}
</style>
