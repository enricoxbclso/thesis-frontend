import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../pages/Home.vue';
import Test from '../../pages/Test.vue';
import About from '../../pages/About.vue'
import Login from '../../pages/Login.vue'
import Manager from '../../pages/ManagerDashboard.vue';
import Landing from '../../pages/Landing.vue';


const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { hideNav: true }
  },
  { 
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: { hideNav: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { hideNav: true }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    meta: { hideNav: true }
  }

  
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
