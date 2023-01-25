<template>
  <div class="board">
    <div
      class="column"
      v-for="column in storeBoard.columnsList"
      :key="column.id"
    >
      <p class="column-name">{{ column.name }}</p>
      <TrTask />
      <div class="btn-add-task"
           @click="showAddTaskModal(column.id)">Добавить задачу +
      </div>
    </div>
    <div class="btn-add-column"
         @click="showAddColumnModal">Добавить колонку +
    </div>
    <!--  ModalComponent [add column] -->
    <!--    TODO: :isDisabled="v$.$invalid"-->
    <TrModal
      btnText="Добавить колонку"
      :isOpen="addColumnModal"
      @mSubmit="addColumn"
      @mClose="closeAddColumnModal"
    >
      <template v-slot:modalBody>
        <TrInput
          inputType="text"
          placeholder=" название колонки"
          v-model="newColumnName"
          :validateMessage="v$.newColumnName?.$errors[0]?.$message"
          @inputSubmit="addColumn"
        />
      </template>
    </TrModal>
    <!--  ModalComponent [add task] -->
    <!--    TODO: :isDisabled="v$.$invalid"-->
    <TrModal
      btnText="Добавить задачу"
      :isOpen="addTaskModal"
      @mSubmit="addTask"
      @mClose="closeAddTaskModal"
    >
      <template v-slot:modalBody>
        <TrInput
          inputType="text"
          placeholder=" Name"
          v-model="newTaskName"
          :validateMessage="v$.newTaskName?.$errors[0]?.$message"
          @inputSubmit="addTask"
        />
        <TrInput
          inputType="text"
          placeholder=" Summery"
          v-model="newTaskSummery"
          :validateMessage="v$.newTaskSummery?.$errors[0]?.$message"
          @inputSubmit="addTask"
        />
        <TrInput
          inputType="text"
          placeholder=" Description"
          v-model="newTaskDescription"
          :validateMessage="v$.newTaskDescription?.$errors[0]?.$message"
          @inputSubmit="addTask"
        />
      </template>
    </TrModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import TrModal from "@/components/kit/TrModal.vue";
import TrInput from "@/components/kit/TrInput.vue";
import TrTask from "@/components/kit/TrTask.vue";

import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useBoardStore";

import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength } from "@vuelidate/validators";
import validateMessages from "@/config/validateMessages";

// Stores
const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

// Флаги open/close модальных окон
const addColumnModal = ref(false);
const addTaskModal = ref(false);

// Реактивные переменные инпутов создания колонки
const newColumnName = ref("");

// Реактивные переменные создания задачи
const newTaskName = ref("");
const newTaskSummery = ref("");
const newTaskDescription = ref("");

// Переменная для хранения id колонки при зоздании новой задачи
let newTaskColumnId = null;

// Правила валидации
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
    $autoDirty: true
  },
  // newTaskName: {
  //   minLength: helpers.withMessage(
  //     () => validateMessages.minLenght,
  //     minLength(4)
  //   ),
  //   maxLength: helpers.withMessage(
  //     () => validateMessages.maxLenght,
  //     maxLength(30)
  //   ),
  //   required: helpers.withMessage(validateMessages.required, required),
  //   $autoDirty: true
  // },
  // newTaskSummery: {
  //   minLength: helpers.withMessage(
  //     () => validateMessages.minLenght,
  //     minLength(4)
  //   ),
  //   maxLength: helpers.withMessage(
  //     () => validateMessages.maxLenght,
  //     maxLength(30)
  //   ),
  //   required: helpers.withMessage(validateMessages.required, required),
  //   $autoDirty: true
  // },
  // newTaskDescription: {
  //   minLength: helpers.withMessage(
  //     () => validateMessages.minLenght,
  //     minLength(4)
  //   ),
  //   maxLength: helpers.withMessage(
  //     () => validateMessages.maxLenght,
  //     maxLength(30)
  //   ),
  //   required: helpers.withMessage(validateMessages.required, required),
  //   $autoDirty: true
  // }
};

// Объект валидации
const v$ = useVuelidate(rules, {
  newColumnName
});

onMounted(async () => {
  await storeBoard.loadBoard(storeAuth.token, storeBoard.activeProjId);
});

const addColumn = () => {
  if (!newColumnName.value || !storeBoard.activeProjId) return;
  storeBoard.createColumn(storeAuth.token, newColumnName.value);
  closeAddColumnModal();
};

const addTask = async () => {
  await storeBoard.createTask(
    storeAuth.token,
    newTaskName.value,
    newTaskSummery.value,
    newTaskDescription.value,
    newTaskColumnId
  );
  closeAddTaskModal();
};
const showAddColumnModal = () => {
  if (storeBoard.activeProjId) addColumnModal.value = true;
};
const closeAddColumnModal = () => {
  newColumnName.value = "";
  v$.value.$reset();
  addColumnModal.value = false;
};
const showAddTaskModal = (column_id) => {
  newTaskColumnId = column_id;
  addTaskModal.value = true;
};
const closeAddTaskModal = () => {
  newTaskColumnId = null;
  newTaskName.value = "";
  newTaskSummery.value = "";
  newTaskDescription.value = "";
  v$.value.$reset();
  addTaskModal.value = false;
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
  padding: 14px;
  width: 300px;
  height: 100%;
  min-height: 100%;
  border-radius: 8px;
  background-color: var(--color-bg-column);
}

.column-name {
  height: 42px;
  font-size: 18px;
  background-color: var(--color-bg-column);
  cursor: pointer;
}

.btn-add-column {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 14px;
  width: 300px;
  height: 42px;
  font-size: 18px;
  border-radius: 8px;
  background-color: var(--color-bg-column);
  cursor: pointer;
}

.btn-add-task {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 12px;
  padding-left: 10px;
  width: 100%;
  height: 30px;
  border-radius: 8px;
  background-color: var(--color-bg-board);
  cursor: pointer;
}

</style>
