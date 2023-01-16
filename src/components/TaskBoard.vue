<template>
  <div class="board">
    <div v-for="item in storeBoard.columnsList" class="column">
      <p class="column-header">{{ item.name }}</p>
    </div>
    <div class="column">
      <div @click="createModal = !createModal" v-if="!createModal" class="btn">Новая колонка</div>
      <p v-if="projectName" class="column-header">{{ projectName }}</p>
<!--      <form v-else action="" @submit.prevent="createColumn">-->
<!--        <input type="text" v-model="projectName" class="input"/>-->
<!--      </form>-->
    </div>



    <!--  ModalComponent [add column] -->
    <Modal
        btnText="Добавить колонку"
        :isOpen="createModal"
        @mSubmit="createColumn"
        @mClose="createModal = false"
    >
      <template v-slot:modalBody>
        <input
            name="modal-body"
            class="input-modal"
            v-model="projectName"
            @keydown="iSubmit($event, createColumn)"
            placeholder="Название колонки"
            type="text"
        />
      </template>
    </Modal>





  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import Modal from "@/components/kit/Modal.vue";
import api from "../api/api";
import iSubmit from "@/lib/ISubmit"

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "../stores/useBoardStore";

const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

const createModal = ref(false)
const projectName = ref("");

const createColumn = () => {
  if (projectName.value) {
    if (!storeBoard.activeProjId) {
      //:TODO toast "Выберите проект"
      console.log(`Выберите проект`);
    }
    storeBoard.createColumn(storeAuth.token, projectName.value);
    projectName.value = "";
    createModal.value = false;
  }
};

onMounted(async () => {
  await storeBoard.loadBoard(storeAuth.token, storeBoard.activeProjId);
  storeBoard.columnsList.value = await api.getColumns(
      storeAuth.token,
      storeBoard.activeProjId
  );
});
</script>

<style scoped>
.board {
  display: flex;
  justify-content: flex-start;
  position: static;

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

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0;
  border: none;
  font-size: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  opacity: .3;
  background-color: #454552;
}

.column-header {
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
