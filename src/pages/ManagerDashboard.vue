<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-900">Manager Dashboard</h1>
      <button @click="logout" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Logout</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Menu Management Section -->
      <section class="bg-white p-8 rounded-lg shadow-lg col-span-2">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Menu Management</h2>

        <!-- Add New Menu Item Form -->
        <div ref="formContainer" class="space-y-6">
          <div>
            <label class="block text-lg font-medium text-gray-700">Product Name</label>
            <input v-model="productName" type="text" class="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:border-gray-500" placeholder="Enter Product Name" />
          </div>

          <div>
            <label class="block text-lg font-medium text-gray-700 mb-3">Type</label>
            <div class="flex gap-4">
              <label class="flex items-center space-x-2">
                <input v-model="type" type="radio" name="type" value="Milktea" />
                <span>Milktea</span>
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
            {{ isEditing ? 'Update Product' : 'Add Product' }}
          </button>
        </div>
        
          <!-- Current Menu Items -->
        <div class="mt-8">
          <h3 class="text-2xl font-semibold mb-6">Current Menu Items</h3>
          <div v-if="products.length > 0">
            <div v-for="product in products" :key="product.pkProductId" class="bg-white rounded-lg shadow-md mb-4 p-4">
              <div class="font-bold text-xl mb-2">Product Name: <span class="font-semibold text-xl ml-2">{{ product.name }}</span></div>
              <div class="flex flex-col space-y-2">
                <div class="text-lg text-gray-600">
                  <div class="mb-2">Price: ₱{{ product.price }}</div>
                  <div class="mb-2">Size: {{ product.size }}</div>
                  <div :class="{'text-green-600': product.availability === 'Available', 'text-red-600': product.availability === 'Not Available'}" class="font-semibold">
                    {{ product.availability }}
                  </div>
                </div>
                <div class="mt-4 flex space-x-2">
                  <button @click="editProduct(product)" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">Edit</button>
                  <button @click="deleteProduct(product.pkProductId)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500">No products found.</p>
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
                <h4 class="text-2xl font-bold mb-2">Order #{{ order.pkOrderId }}</h4>
                <p class="text-yellow-600 font-semibold mb-4">Status: {{ order.status }}</p>
                <p class="text-gray-800">Table No.: <span class="font-semibold">{{ order.fkTableId }}</span></p>
                <p class="text-gray-800">Product Name: <span class="font-semibold">{{ getProductDetails(order.fkProductId).name }}</span></p>
                <p class="text-gray-800">Price: <span class="font-semibold">₱{{ getProductDetails(order.fkProductId).price }}</span></p>
                <p class="text-gray-800">Size: <span class="font-semibold">{{ getProductDetails(order.fkProductId).size }}</span></p>
                <p class="text-gray-800">Quantity: <span class="font-semibold">{{ order.quantity }}</span></p>
              </div>
              <button @click="markOrderAsServed(order.fkTableId)" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Serve Order</button>
            </div>
          </li>
        </ul>

      <!-- Served Orders -->
        <h4 class="text-xl font-semibold mb-4 mt-8 text-blue-600">Served Orders</h4>
        <ul class="space-y-4">
          <li v-for="order in servedOrders" :key="order.pkOrderId" class="border border-blue-400 bg-blue-50 p-6 rounded-lg shadow">
            <div>
              <h4 class="text-2xl font-bold mb-2">Order #{{ order.pkOrderId }}</h4>
              <p class="text-blue-600 font-semibold mb-4">Status: {{ order.status }}</p>
              <p class="text-gray-800">Table No.: <span class="font-semibold">{{ order.fkTableId }}</span></p>
              <p class="text-gray-800">Product Name: <span class="font-semibold">{{ getProductDetails(order.fkProductId).name }}</span></p>
              <p class="text-gray-800">Price: <span class="font-semibold">₱{{ getProductDetails(order.fkProductId).price }}</span></p>
              <p class="text-gray-800">Size: <span class="font-semibold">{{ getProductDetails(order.fkProductId).size }}</span></p>
              <p class="text-gray-800">Quantity: <span class="font-semibold">{{ order.quantity }}</span></p>
            </div>
          </li>
        </ul>

      <!-- Completed Orders -->
        <h4 class="text-xl font-semibold mb-4 mt-8 text-green-600">Completed Orders</h4>
        <ul class="space-y-4">
          <li v-for="order in completedOrders" :key="order.pkOrderId" class="border border-green-400 bg-green-50 p-6 rounded-lg shadow">
            <div>
              <h4 class="text-2xl font-bold mb-2">Order #{{ order.pkOrderId }}</h4>
              <p class="text-green-600 font-semibold mb-4">Status: {{ order.status }}</p>
              <p class="text-gray-800">Table No.: <span class="font-semibold">{{ order.fkTableId }}</span></p>
              <p class="text-gray-800">Product Name: <span class="font-semibold">{{ getProductDetails(order.fkProductId).name }}</span></p>
              <p class="text-gray-800">Price: <span class="font-semibold">₱{{ getProductDetails(order.fkProductId).price }}</span></p>
              <p class="text-gray-800">Size: <span class="font-semibold">{{ getProductDetails(order.fkProductId).size }}</span></p>
              <p class="text-gray-800">Quantity: <span class="font-semibold">{{ order.quantity }}</span></p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>

</template>


<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
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
const servedOrders = ref([]); 

const formContainer = ref(null)
const selectedProduct = ref(null)
const isEditing = ref(false);
const router = useRouter();

// Handle image upload
const handleImageUpload = (event) => {
  productImage.value = event.target.files[0];  
  if (!productImage.value) {
    toast.error('No file selected.');
  }
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

const editProduct = (product) => {
  isEditing.value = true;
  selectedProduct.value = product; 
  productName.value = product.name;
  type.value = product.type;
  size.value = product.size;
  price.value = product.price;
  availability.value = product.availability;

  if (formContainer.value) {
    formContainer.value.scrollIntoView({ behavior: 'smooth' });
  }
};
const handleUpdateProduct = async () => {
  const productId = selectedProduct.value.pkProductId; 
  const formData = new FormData();

  formData.append('name', productName.value);
  formData.append('price', price.value);
  formData.append('size', size.value);
  formData.append('type', type.value);
  formData.append('availability', availability.value);

  if (productImage.value) {
    formData.append('productImage', productImage.value);
  }

  try {
    await axios.post(`http://127.0.0.1:8000/api/admin/${productId}/update-product/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Product updated successfully.');
    resetForm();
    await fetchProducts(); 
  } catch (error) {
    toast.error('Failed to update product.');
    console.error('Error updating product:', error);
  }
};


const resetForm = () => {
  productName.value = '';
  type.value = '';
  size.value = '';
  price.value = '';
  availability.value = '';
  productImage.value = null;
  isEditing.value = false;
};

// Delete a product
const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/admin/${productId}/delete-product/`);
    toast.success('Product deleted successfully.');
    fetchProducts();
  } catch (error) {
    toast.error('Failed to delete product.');
    console.error('Error deleting product:', error);
  }
};

// Submit product (either add or update)
const submitProduct = () => {
  if (!selectedProduct.value) {
    if (!productName.value || !price.value || !size.value || !type.value) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName.value);
    formData.append('price', price.value);
    formData.append('size', size.value); 
    formData.append('type', type.value); 
    formData.append('availability', availability.value);

    if (productImage.value) {
      formData.append('productImage', productImage.value);
    } else {
      toast.error('Please upload a product image.');
      return;
    }

    axios.post('http://127.0.0.1:8000/api/admin/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      toast.success('Product added successfully.');
      resetForm();
      fetchProducts(); 
    })
    .catch(error => {
      toast.error('Failed to add product.');
      console.error('Error adding product:', error);
    });
  } else {
    handleUpdateProduct();
  }
};

//fetch pending orders
const fetchPendingOrders = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/admin/pending-orders');
    pendingOrders.value = response.data.data; 
  } catch (error) {
    toast.error('Failed to fetch pending orders.');
  }
};

//fetch served orders
const fetchServedOrders = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/admin/served-orders`);
    servedOrders.value = response.data.data;
  } catch (error) {
    toast.error('Failed to fetch served orders.');
  }
};

// Fetch completed orders from the API
const fetchCompletedOrders = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/admin/orders-history`);
    completedOrders.value = response.data.data;
  } catch (error) {
    toast.error('Failed to fetch completed orders.');
  }
};


const getProductDetails = (productId) => {
  const product = products.value.find(p => p.pkProductId === productId);
  return product ? { name: product.name, price: product.price, size: product.size } : { name: 'Not Found', price: 0, size: 'N/A' };
};

// Mark an order as served
const markOrderAsServed = async (tableId) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/admin/serve-order/${tableId}`, {
    });
    toast.success(`Order for Table #${tableId} has been marked as served.`);
    await fetchPendingOrders(); 
    await fetchCompletedOrders(); 
  } catch (error) {
    console.error(error); 
    toast.error('Failed to mark the order as served. Please check the table ID.');
  }
};

const logout = async () => {
  try {
    await axios.get('http://127.0.0.1:8000/api/admin/logout');
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

onMounted(async () => {
  await fetchProducts();
  await fetchPendingOrders();
  await fetchCompletedOrders();
  await fetchServedOrders();
});

setInterval(() => {
  fetchPendingOrders();
}, 10000);
</script>

