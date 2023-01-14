<template>
  <div class="board">
    <div v-for="item in storeBoard.columnsList" class="column">
      <p class="column-header">{{item.name}}</p>
    </div>
    <div class="column">
      <div @click="inputSwitch" v-if="!isInput" class="btn">
        hello dima
      </div>

      <form  v-else action="" @submit.prevent="createColumn">
        <input type="text" v-model="projectName" class="input" />
      </form>

    </div>



  </div>
</template>

<script setup>
 import { ref, onMounted } from "vue";
 import api from "../api/api";

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "../stores/useBoardStore";
const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

const isInput = ref(false);
const projectName = ref('')
const inputSwitch = () => {
  isInput.value = !isInput.value;
}
const createColumn = () => {
  inputSwitch()
  if(projectName.value){
    storeBoard.createColumn(storeAuth.token, projectName.value);
  }
}

onMounted(async () => {
  storeBoard.loadBoard(storeAuth.token, storeBoard.activeProjId);
  storeBoard.columnsList.value = await api.getColumns(storeAuth.token, storeBoard.activeProjId);
});
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
}
.column-header{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  background-color: #4f5263;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 18px;
}
</style>
