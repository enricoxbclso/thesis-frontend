<template>
  <div class="flex flex-col items-center text-center p-8">
    <!-- Header and Subheading Section -->
    <div class="bg-white p-8 rounded-lg mb-12 max-w-3xl w-full">
      <img class="h-[100%] mx-auto" :src="banner" alt="Milk Tea" />
      <h1 class="text-4xl font-bold text-gray-800">
        Welcome to <span class="text-green-600">Tea Crate Cafe</span>
      </h1>
      <p class="text-xl text-gray-600 mt-4">The finest milk tea experience in Abuyog, Leyte.</p>
      <p class="text-gray-500 mt-4">
        At Tea Crate Cafe, we believe that every drink tells a story. Whether you're enjoying our
        best-selling milk tea or exploring our seasonal drinks, we're committed to providing a
        unique and flavorful experience. Our cafe is a place where friends and family can gather,
        relax, and enjoy life's sweetest moments.
      </p>
    </div>

    <!-- Table Number Section -->
    <div class="bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full">
      <p class="text-gray-700 mb-4">Please input your table number below:</p>
      <input
        type="text"
        v-model="tableNumber"
        placeholder="Enter table number"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        @click="proceed"
        class="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
      >
        Proceed
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import banner from '../assets/images/banner.png';

const tableNumber = ref('');
const router = useRouter();

const proceed = async () => {
  if (tableNumber.value) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dine-in', {
        tableNumber: tableNumber.value
      });

      console.log('Response from backend:', response.data);

      if (response.data.success) {
        const tableId = tableNumber.value;

        console.log('Table ID to be stored:', tableId);

        // Store the tableId in local storage
        localStorage.setItem('tableId', tableId);

        console.log('Stored tableId in localStorage:', localStorage.getItem('tableId'));

        toast.success(`Session started for table number: ${tableNumber.value}`);
        router.push('/home'); 
      } else {
        toast.error(response.data.message || 'Error starting session.');
      }
    } catch (error) {
      console.error('Error starting session:', error);
      toast.error('Failed to start session. Please try again.');
    }
  } else {
    toast.error('Please enter a table number.');
  }
};
</script>

<style scoped>
h1, h2 {
  font-family: 'Roboto Slab', serif;
}
</style>
