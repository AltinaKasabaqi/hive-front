import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import authorizeMiddleware from './authorization/auth';

const app = createApp(App)
app.use(router);
router.beforeEach(authorizeMiddleware);

app.mount("#app");


