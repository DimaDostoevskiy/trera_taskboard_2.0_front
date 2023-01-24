<template>
  <div class="board">
    <div v-for="item in storeBoard.columnsList" class="column">
      <p class="column-header">{{ item.name }}</p>
    </div>
    <div class="column">
      <div @click="showNewColumnModal" class="btn">Новая колонка</div>
      <p v-if="projectName" class="column-header">{{ projectName }}</p>
    </div>

    <!--  ModalComponent [add column] -->
    <TrModal
      btnText="Добавить колонку"
      :isOpen="createModal"
      @mSubmit="createColumn"
      @mClose="createModal = false"
    >
      <template v-slot:modalBody>
        <TrInput
          inputType="text"
          placeholder=" название колонки"
          v-model="projectName"
          :validateMessage="v$.projectName?.$errors[0]?.$message"
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
const projectName = ref("");

const rules = {
  projectName: {
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

const v$ = useVuelidate(rules, { projectName });

onMounted(async () => {
  await storeBoard.loadBoard(storeAuth.token, storeBoard.activeProjId);
  storeBoard.columnsList.value = await api.getColumns(
    storeAuth.token,
    storeBoard.activeProjId
  );
});

const createColumn = () => {
  if (!projectName.value || !storeBoard.activeProjId) return;
  storeBoard.createColumn(storeAuth.token, projectName.value);
  projectName.value = "";
  v$.value.$reset();
  createModal.value = false;
};

const showNewColumnModal = () => {
  if (!storeBoard.activeProjId) return;
  createModal.value = true;
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
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0;
  border: none;
  font-size: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  opacity: 0.3;
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
