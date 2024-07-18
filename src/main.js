import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import storeRows from "./store";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(storeRows);
app.use(pinia);

app.mount("#app");

app.mount("#app");
