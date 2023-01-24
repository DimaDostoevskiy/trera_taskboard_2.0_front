<template>
  <div>
    <input
      class="input"
      :class="{ input__error: validateMessage }"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown="ISubmit($event, emitSubmit)"
    />
    <div class="validate">
      <span class="validate__message">
        {{ validateMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ISubmit from "@/lib/ISubmit";

defineProps([
  "modelValue",
  "inputType",
  "validateMessage",
  "placeholder",
  "keydownEvent",
]);

const $emit = defineEmits(["update:modelValue", "inputSubmit"]);

const emitSubmit = () => {
  $emit("inputSubmit");
};
</script>

<style scoped>
.input {
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  height: 42px;
  font-size: 24px;
  color: var(--color-text);
  border: 0;
  border-bottom: 1px solid var(--color-input-border);
  background-color: var(--color-bg-board);
}
.input__error {
  border-color: var(--color-danger);
}
.validate {
  height: 30px;
}
.validate__message {
  color: var(--color-danger);
}
</style>
