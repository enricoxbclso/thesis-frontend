import { createApp } from 'vue'
import './style.css'
import router from './assets/router';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue'


const app = createApp(App);

app.use(router);


app.mount('#app');

app.use(Vue3Toastify, { 
  autoClose: 1000,
  position: 'top-center',
  theme: 'colored', 
  transition: 'slide',
  clearOnUrlChange: false,
});
