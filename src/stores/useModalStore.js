import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
  const isShowModal = ref(false);
  return { isShowModal };
});
