import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../pages/Home.vue';
import Employee from '../../pages/Employee.vue';
import Login from '../../pages/Login.vue';
import Manager from '../../pages/Manager.vue';
import Order from '../../pages/Order.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },

  
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
