<template>
  <div v-if="isOpen" class="modal">
    <div class="overlay" @click="modalClose"></div>
    <div class="card">

      <slot :name="'modalHeader'"></slot>
      <slot :name="'modalBody'"></slot>
      <button @click="modalSubmit" class="btn">
        {{btnText}}
      </button>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps(['isOpen', 'btnText']);
const emit = defineEmits(['mSubmit', 'mClose'])

const modalClose = (e) => {
  emit('mClose', e);
}

const modalSubmit = (e) => {
  emit('mSubmit', e);
}
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(100, 100, 100, 0.5);
  z-index: 5;
}
.modal {
  z-index: 5;
  padding-top: 30px;
}
.card {
  padding: 90px 50px 0 50px;
  z-index: 5;
  max-width: 433px;
  width: 100%;
}
.btn {
  margin-top: 60px;
  margin-bottom: 100px;
  background-color:var(--color-bg-board);
  color: var(--color-text-primary);
  border-width: 2px;
  font-size: 16px;
}
</style>
