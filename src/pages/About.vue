<template>
  <div class="about-page bg-white px-[200px] flex flex-col items-center">
    <!-- Hero Section (With About the Shop Content) -->
    <section class="relative w-full h-[80vh] bg-white flex items-center justify-between px-8">
      <div class="relative z-10 space-y-6 w-1/2">
        <!-- Hero Text -->
        <h1 class="text-5xl font-bold">
          Welcome to
        </h1>
        <h1 class="text-5xl font-bold text-green-600">
          Tea Crate Cafe
        </h1>
        <p class="text-lg text-gray-700">
          The finest milk tea experience in Abuyog, Leyte.
        </p>

        <!-- About the Shop content here -->
        <div class="space-y-4 max-w-xl">
          <p class="text-lg text-gray-700 leading-relaxed">
            At Tea Crate Cafe, we believe that every drink tells a story. Whether you're enjoying our best-selling milk tea or exploring our seasonal drinks, we're committed to providing a unique and flavorful experience. Our cafe is more than just a place to grab a drink – it’s a community space where friends and family can gather, relax, and enjoy life’s sweetest moments.
          </p>
          <button class="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
            Check Our Menu
          </button>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="w-1/2 h-full flex items-center justify-center">
        <img class="h-[100%] object-cover" :src="about" alt="Hero Image">
      </div>
    </section>

    <!-- Owner Section -->
    <section class="owner-section py-16 px-4 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
        <img class="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-green-500" :src="owner" alt="Owner Image">
        <div class="text-lg lg:w-2/3 space-y-4">
          <!-- Apply Roboto Slab font-family -->
          <p class="text-3xl font-semibold text-gray-900 mb-4" style="font-family: 'Roboto Slab', serif;">Meet the Owner</p>
          <p class="text-gray-700 leading-relaxed">
            Hello! I'm <strong class="font-semibold text-green-500">Mrs. Grizelaine Joy T. Asoy</strong>, the owner and manager of Tea Crate Cafe. Our mission is to bring joy to every sip of your milk tea and provide you with a cozy space to relax. Located in the heart of Abuyog, Leyte, we serve you the freshest and most delightful tea, crafted with love and passion. We can't wait to share the experience with you!
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Info Section -->
    <section class="contact-section py-16 px-4">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Apply Roboto Slab font-family -->
        <h2 class="text-3xl font-bold text-gray-900 mb-6" style="font-family: 'Roboto Slab', serif;">Get in Touch</h2>
        <p class="text-lg text-gray-700 mb-6">We'd love to hear from you! Reach out to us using the contact details below or visit our cafe for a chat and a cup of your favorite tea.</p>

        <!-- Contact Information -->
        <div class="space-y-4 text-lg">
          <p class="text-gray-700"><strong>Address:</strong> Market Site, Abuyog, Leyte, Philippines 6510</p>
          <p class="text-gray-700"><strong>Phone:</strong> 0966 833 3522</p>
          <p class="text-gray-700"><strong>Email:</strong> teacreatecafe@gmail.com</p>
          <p class="text-gray-700"><strong>Hours:</strong> Everyday | 10:00 am - 6:00 pm</p>
        </div>  

        <!-- Social Media Icons -->
        <div class="flex justify-center mt-8 space-x-6 text-3xl text-gray-500">
          <a href="https://facebook.com" target="_blank" class="hover:text-green-400 transition duration-300">
            <span class="iconify" data-icon="mdi:facebook"></span>
          </a>
          <a href="https://instagram.com" target="_blank" class="hover:text-green-400 transition duration-300">
            <span class="iconify" data-icon="mdi:instagram"></span>
          </a>
          <a href="https://youtube.com" target="_blank" class="hover:text-green-400 transition duration-300">
            <span class="iconify" data-icon="mdi:youtube"></span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import owner from '../assets/images/owner.jpg'; 
import about from '../assets/images/about.png'; 
</script>

<style scoped>
.about-page {
  font-family: 'Inter', sans-serif;
}

.hero-section {
  background-size: cover;
  background-position: center;
  position: relative;
  height: 80vh;
}

h1, h2 {
  font-family: 'Roboto Slab', serif;
}

p {
  font-family: 'Roboto', sans-serif;
}

.bg-cover {
  background-size: cover;
  background-position: center;
}

button {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

img {
  object-fit: cover;
}
</style>
