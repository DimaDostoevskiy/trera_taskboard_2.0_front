<template>
  <div class="board">
    <div
      class="column"
      v-for="column in storeBoard.columnsList"
      :key="column.id"
    >
      <p class="column-header">{{ column.name }}</p>
    </div>
    
      <div @click="showNewColumnModal" class="btn">Новая колонка
        <img class="icon" src="../assets/images/g_add.png" alt="add" />
      </div>
    

    <!--  ModalComponent [add column] -->
    <TrModal
      btnText="Добавить колонку"
      :isOpen="createModal"
      @mSubmit="createColumn"
      @mClose="closeNewColumnModal"
    >
      <template v-slot:modalBody>
        <TrInput
          inputType="text"
          placeholder=" название колонки"
          v-model="newColumnName"
          :validateMessage="v$.newColumnName?.$errors[0]?.$message"
          @inputSubmit="createColumn"
        />
      </template>
    </TrModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useBoardStore";

import api from "@/api/api";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import validateMessages from "@/config/validateMessages";

const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

const createModal = ref(false);
const newColumnName = ref("");

const rules = {
  newColumnName: {
    minLength: helpers.withMessage(
      () => validateMessages.minLenght,
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      () => validateMessages.maxLenght,
      maxLength(30)
    ),
    required: helpers.withMessage(validateMessages.required, required),
    $autoDirty: true,
  },
};

const v$ = useVuelidate(rules, { newColumnName });

onMounted(async () => {
  await storeBoard.loadBoard(storeAuth.token, storeBoard.activeProjId);
  storeBoard.columnsList.value = await api.getColumns(
    storeAuth.token,
    storeBoard.activeProjId
  );
});

const createColumn = () => {
  if (!newColumnName.value || !storeBoard.activeProjId) return;
  storeBoard.createColumn(storeAuth.token, newColumnName.value);
  closeNewColumnModal();
};

const closeNewColumnModal = () => {
  newColumnName.value = "";
  v$.value.$reset();
  createModal.value = false;
};

const showNewColumnModal = () => {
  if (storeBoard.activeProjId) createModal.value = true;
};
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
  justify-content: space-between;
  align-items: center;

  padding-left: 18px;
  width: 300px;
  margin: 0;
  border: none;
  font-size: 15px;
  background-color: #3A3C49;
}

.icon {
  margin-right: 15px;
}

.column-header {
  display: flex;
  justify-content: start;
  padding-top: 12px;
  padding-left: 24px;
  
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 15px;
}
</style>
