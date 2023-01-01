import App from "./App.vue";
import { createApp } from "vue";

import './assets/main.css'

import router from "@/router/index";
import { createPinia } from 'pinia'

const app = createApp(App);

app.use(router);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");