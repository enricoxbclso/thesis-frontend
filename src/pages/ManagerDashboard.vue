<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-900">Manager Dashboard</h1>
      <button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Logout</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Menu Management Section -->
      <section class="bg-white p-8 rounded-lg shadow-lg col-span-2">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Menu Management</h2>

        <!-- Add New Menu Item Form -->
        <div class="space-y-6">
          <div>
            <label class="block text-lg font-medium text-gray-700">Product Name</label>
            <input v-model="productName" type="text" class="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:border-gray-500" placeholder="Enter Product Name" />
          </div>

          <div>
            <label class="block text-lg font-medium text-gray-700 mb-3">Type</label>
            <div class="flex gap-4">
              <label class="flex items-center space-x-2">
                <input v-model="type" type="radio" name="type" value="Beverage" />
                <span>Beverage</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="type" type="radio" name="type" value="Shake" />
                <span>Shake</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="type" type="radio" name="type" value="Food" />
                <span>Food</span>
              </label>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-lg font-medium text-gray-700">Price</label>
            <input v-model="price" type="number" class="mt-2 p-3 w-full border rounded-lg focus:border-gray-500" placeholder="₱ Price" />
          </div>

          <!-- Size -->
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-3">Size</label>
            <div class="flex gap-4">
              <label class="flex items-center space-x-2">
                <input v-model="size" type="radio" name="size" value="Small" />
                <span>Small</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="size" type="radio" name="size" value="Medium" />
                <span>Medium</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="size" type="radio" name="size" value="Large" />
                <span>Large</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="size" type="radio" name="size" value="No Size" />
                <span>No Size</span>
              </label>
            </div>
          </div>

          <!-- Availability -->
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-3">Availability</label>
            <div class="flex gap-4">
              <label class="flex items-center space-x-2">
                <input v-model="availability" type="radio" name="availability" value="Available" />
                <span>Available</span>
              </label>
              <label class="flex items-center space-x-2">
                <input v-model="availability" type="radio" name="availability" value="Not Available" />
                <span>Not Available</span>
              </label>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-lg font-medium text-gray-700">Upload Product Image</label>
            <input type="file" @change="handleImageUpload" class="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:border-gray-500" />
          </div>

          <button @click="submitProduct" class="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition">
            Add Product
          </button>
        </div>

        <!-- Current Menu Items -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold mb-4">Current Menu Items</h3>
          <div v-if="products.length > 0">
            <div v-for="product in products" :key="product.id" class="flex justify-between items-center border-b py-3">
              <div>
                <div class="font-bold text-lg">{{ product.name }}</div>
                <div class="text-sm text-gray-500">
                  Price: ₱{{ product.price }} - {{ product.size }} - {{ product.type }}
                </div>
                <div class="mt-1">
                  Status:
                  <span :class="{'text-green-600': product.availability === 'Available', 'text-red-600': product.availability === 'Not Available'}">
                    {{ product.availability }}
                  </span>
                </div>
              </div>
              <div>
                <button @click="editProduct(product.id)" class="bg-yellow-500 text-white px-3 py-2 mr-2 rounded-lg hover:bg-yellow-600">Edit</button>
                <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">Delete</button>
                <button @click="markNotAvailable(product.id)" class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 ml-2">Mark Not Available</button>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No products found.</p>
          </div>
        </div>
      </section>

      <!-- Orders Tracking Section -->
      <section class="bg-white p-8 rounded-lg shadow-lg">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Manage Customer Orders</h3>

        <!-- Pending Orders -->
        <h4 class="text-xl font-semibold mb-4 text-yellow-600">Pending Orders</h4>
        <ul class="space-y-4">
          <li v-for="order in pendingOrders" :key="order.pkOrderId" class="border border-yellow-400 bg-yellow-50 p-6 rounded-lg shadow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-2xl font-bold">Order #{{ order.pkOrderId }}</h4>
                <p class="text-gray-800">Table No.: <span class="font-semibold">{{ order.fkTableId }}</span></p>
                <p class="text-gray-800">Product ID: <span class="font-semibold">{{ order.fkProductId }}</span></p>
                <p class="text-gray-800">Quantity: <span class="font-semibold">{{ order.quantity }}</span></p>
                <p class="text-yellow-600 font-semibold">Status: {{ order.status }}</p>
                <p class="text-sm text-gray-500 mt-2">Created At: {{ order.created_at }}</p>
                <p class="text-sm text-gray-500 mt-2">Updated At: {{ order.updated_at }}</p>
              </div>
              <button @click="markOrderAsServed(order.fkTableId)" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Serve Order</button>
            </div>
          </li>
        </ul>

        <!-- Completed Orders -->
        <h4 class="text-xl font-semibold mb-4 mt-8 text-green-600">Completed Orders</h4>
        <ul class="space-y-4">
          <li v-for="order in completedOrders" :key="order.pkOrderId" class="border border-green-400 bg-green-50 p-6 rounded-lg shadow">
            <div>
              <h4 class="text-2xl font-bold">Order #{{ order.pkOrderId }}</h4>
              <p class="text-gray-800">Table No.: <span class="font-semibold">{{ order.fkTableId }}</span></p>
              <p class="text-gray-800">Product ID: <span class="font-semibold">{{ order.fkProductId }}</span></p>
              <p class="text-gray-800">Quantity: <span class="font-semibold">{{ order.quantity }}</span></p>
              <p class="text-green-600 font-semibold">Status: {{ order.status }}</p>
              <p class="text-sm text-gray-500 mt-2">Created At: {{ order.created_at }}</p>
              <p class="text-sm text-gray-500">Updated At: {{ order.updated_at }}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

const productName = ref('');
const price = ref(0);
const size = ref('');
const type = ref('');
const availability = ref('Available');
const productImage = ref(null);
const products = ref([]); 
const pendingOrders = ref([]); 
const completedOrders = ref([]); 

// Handle image upload
const handleImageUpload = (event) => {
  productImage.value = event.target.files[0];
};

// Fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/products');
    products.value = response.data.data;
  } catch (error) {
    toast.error('Failed to fetch products.');
  }
};

// Fetch pending orders from the API
const fetchPendingOrders = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/pending-orders');
    pendingOrders.value = response.data.data; 
    console.log('Fetched Pending Orders:', pendingOrders.value);
  } catch (error) {
    toast.error('Failed to fetch pending orders.');
  }
};

// Fetch completed orders from the API
const fetchCompletedOrders = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/orders-history');
    completedOrders.value = response.data.data;
    console.log('Fetched Completed Orders:', completedOrders.value);
  } catch (error) {
    toast.error('Failed to fetch completed orders.');
  }
};
// Submit new product
const submitProduct = async () => {
  const formData = new FormData();
  formData.append('name', productName.value);
  formData.append('price', price.value); // Single price field based on selected size
  formData.append('size', size.value); // New: Add size field (Small, Medium, Large, No Size)
  formData.append('type', type.value); // Updated: Replace 'category' with 'type'
  formData.append('availability', availability.value); // New: Add availability field (Available, Not Available)
  formData.append('productImage', productImage.value);

  try {
    await axios.post('http://127.0.0.1:8000/api/admin/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.error('Product added successfully!');
    await fetchProducts(); 
  } catch (error) {
    toast.error('Failed to add product.');
  }
};

// Mark an order as served
// Mark an order as served
const markOrderAsServed = async (tableId) => {
  try {
    await axios.post(`http://127.0.0.1:8000/api/admin/serve-order/${tableId}`, {
    });
    toast.error(`Order for Table #${tableId} has been marked as served.`);
    await fetchPendingOrders(); 
    await fetchCompletedOrders(); 
  } catch (error) {
    toast.error('Failed to mark the order as served.');
  }
};




onMounted(async () => {
  await fetchProducts();
  await fetchPendingOrders();
  await fetchCompletedOrders();
});

// setInterval(() => {
//   fetchPendingOrders();
// }, 10000);
</script>

