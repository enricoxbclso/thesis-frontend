import { createApp } from 'vue'
import './style.css'
import router from './assets/router';
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');