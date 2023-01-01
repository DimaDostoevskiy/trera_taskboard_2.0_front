<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import router from "@/router/index";
onMounted(() =>
  localStorage.getItem("token") ? router.push("/") : router.push("/signin")
);
</script>

<style scoped></style>
