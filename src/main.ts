import { createPinia } from "pinia";
import router from "./router";

import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);
app.use(createPinia());
app.use(router);

app.mount("#app");
