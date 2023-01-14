<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import router from "@/router/index";
import { useAuthStore } from "@/stores/useAuthStore";

const storeAuth = useAuthStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    storeAuth.token = token;
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>

<style scoped></style>
