<template>
  <div>
    <NavBar v-if="!$route.meta.hideNav" class="mb-10"></NavBar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>