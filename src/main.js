import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import storeRows from "./store";

const app = createApp(App);

app.use(router);
app.use(storeRows);

app.mount("#app");
