<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="bg-white/30 bg-clip-padding backdrop-filter backdrop-blur-lg border-gray-100 border-white/40 p-10 rounded-3xl shadow-lg max-w-md w-full relative">

      <div class="text-center">
        <img :src="logo" alt="Logo" class="mx-auto mb-6 h-[150px]" />
        <h1 class="text-black text-2xl font-semibold mb-2">Admin Login</h1>
        <p class="text-gray-500 mb-8">Make a new doc to bring your words, data, and teams together. For free</p>
      </div>

      <form @submit.prevent="login">
        <div class="mb-6">
          <label for="text" class="block text-sm font-medium text-gray-500">Username</label>
          <input
            v-model="email"
            id="email"
            type="username"
            class="mt-2 p-3 block w-full border-none rounded-lg bg-gray-100 placeholder-gray-500 focus:ring-gray-500 focus:outline-none"
            placeholder="Enter Username"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-500">Password</label>
          <div class="relative">
            <input
              v-model="password"
              id="password"
              type="password"
              class="mt-2 p-3 block w-full border-none rounded-lg bg-gray-100 placeholder-gray-500 focus:ring-gray-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <i class="fas fa-eye"></i>
            </button>
          </div>
          <a href="#" class="text-sm text-gray-500 mt-3 float-right mb-8 underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition text-lg"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import logo from '../assets/images/logo.png'

const email = ref('') 
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/admin/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      localStorage.setItem('isLoggedIn', 'true'); 
      window.location.href = '/manager'; 
    } else {
      toast.error(response.data.message || 'Login failed. Please check your credentials and try again.');
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      toast.error('Validation error. Please check your input.');
    } else {
      toast.error('An error occurred. Please try again later.');
    }
  }
}
</script>
