<template>
  <nav class="sticky top-0 z-50 backdrop-filter bg-[#EFEFEF]">
    <div class="flex items-center mx-[160px] p-4 relative">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <router-link to="/">
          <img :src="logo" class="h-[50px]" alt="Logo" />
        </router-link>
        <span class="text-[18px] font-semibold">Tea Crate Café</span>
      </div>

      <!-- Navbar Links -->
      <div class="flex items-center space-x-10 ml-[500px]">
        <router-link to="/home" class="text-gray-800 hover:text-[#228B22] flex items-center mx-auto" active-class="active-nav">
          <Icon icon="system-uicons:home" class="mr-1 h-6 w-6" />
          Home
        </router-link>
        <router-link to="/about" class="text-gray-800 hover:text-[#228B22] flex items-center" active-class="active-nav">
          <Icon icon="circum:shop" class="mr-1 h-6 w-6"/>
          About Us
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script setup>
import logo from '../assets/images/logo.png';
import { Icon } from '@iconify/vue';
</script>

<style scoped>
/* Styling for the active nav link to create a bottom bar */
.active-nav {
  color: #228B22; /* Active text color */
  position: relative; /* Needed for positioning pseudo-element */
}

.active-nav::after {
  content: "";
  position: absolute;
  bottom: -30px; /* Adjust this value based on your padding and margin */
  left: 0;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  height: 4px; /* Height of the green bar */
  background-color: #228B22; /* Green color */
  transition: all 0.3s ease; /* Smooth transition */
}
</style>
