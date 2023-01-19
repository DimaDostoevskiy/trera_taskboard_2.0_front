<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import router from "@/router/index";
import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useBoardStore";

const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const activeProjId = localStorage.getItem("activeProjId");

  if (token) {
    if (activeProjId) {
      storeBoard.setActiveProjId(activeProjId);
    }
    storeAuth.token = token;
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>
