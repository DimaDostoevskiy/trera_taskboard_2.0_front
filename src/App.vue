<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import router from "@/router/index";
import useAuthStore from "@/stores/useAuthStore";
import useBoardStore from "@/stores/useAuthStore";

const storeAuth = useAuthStore();
const storeBoard = useBoardStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  const activeProjId = localStorage.getItem("activeProjId");

  if (token) {

    if(activeProjId){
      storeBoard.activeProjId = activeProjId;
    }

    storeAuth.token = token;
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>

<style scoped></style>
