<template>
  <div class="flex p-4 mx-auto">
    <!-- Menu Section -->
    <div class="w-3/4 pr-4">
      <section class="max-w-7xl mx-auto px-4">
        <!-- Top banner with promotion -->
        <div class="mb-6 relative overflow-hidden rounded-l">
          <div class="bg-gradient-to-r from-green-400 to-green-600 text-white p-8 flex items-center rounded-lg shadow-2xl relative">
            <div class="z-10">
              <h2 class="text-4xl font-bold">Welcome to Tea Crate Cafe</h2>
              <p class="text-2xl mt-2">Sip into Happiness with 30% Off on All Milk Teas!</p>
              <p class="text-lg mt-4">Explore our refreshing range of milk teas, made with love and premium ingredients.</p>
            </div>
            <img class="absolute inset-0 h-full w-full object-cover opacity-50 z-0" :src="banner" alt="Tea Crate Cafe Banner" />
          </div>
        </div>

        <!-- Tabs section -->
        <div class="tabs-container mb-8">
          <div class="tabs flex justify-between">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="fetchProducts(tab.name)"
              :class="['tab', { active: currentTab === tab.name }]"
            >
              <span :class="tab.icon" class="tab-icon text-xl mb-1"></span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
          <div class="tabs-bar" :style="{ left: `${tabs.findIndex(tab => tab.name === currentTab) * (100 / tabs.length)}%` }"></div>
        </div>

        <!-- Loading, Error or Product Grid -->
        <div v-if="loading" class="text-center">Loading products...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else-if="products.length === 0" class="text-center">No products available.</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="(productGroup, name) in groupedProducts" 
            :key="name"
            class="border px-[24px] p-4 bg-white shadow-lg transition-transform transform hover:scale-105 rounded-lg"
          >
            <h3 class="text-[24px] font-semibold text-gray-800">{{ name }}</h3>

            <div class="my-2">
              <p class="text-[20px] text-gray-500">Price: ₱{{ selectedPrices[name] }}</p>
              <div class="my-2 text-[20px] font-medium">Size:</div>
              <div class="my-2">
                <label v-for="sizeOption in sizeOptions(name)" :key="sizeOption" class="inline-flex items-center mr-4">
                  <input 
                    type="radio" 
                    :name="`size-${name}`" 
                    :value="sizeOption" 
                    v-model="selectedSizes[name]" 
                    @change="updatePrice(name, sizeOption)"
                    class="form-radio text-blue-500"
                  />
                  <span class="ml-2 text-[20px]">{{ sizeOption }}</span>
                </label>
              </div>
            </div>

            <!-- Quantity controls -->
            <div class="flex items-center justify-between">
              <button class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-l" @click="changeQuantity(name, -1)">
                -
              </button>
              <span class="mx-2 text-sm">{{ selectedQuantities[name] || 1 }}</span>
              <button class="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-r" @click="changeQuantity(name, 1)">
                +
              </button>
            </div>

            <!-- Total price -->
            <div class="mt-3 text-base font-bold md:text-lg">₱{{ (selectedPrices[name] * (selectedQuantities[name] || 1))}}</div>

            <button 
              @click="addToCart({ name, price: selectedPrices[name], size: selectedSizes[name], quantity: selectedQuantities[name] || 1 })" 
              class="mt-4 w-[100%] bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Cart Section -->
    <div class="w-1/4 pl-4 border-l border-gray-200">
      <div class="order-container bg-white border rounded-lg p-6 w-full">
        <!--YOUR NAME FORM SECTION-->
        <form @submit.prevent="submitCustomerName">
          <div class="text-xl font-bold text-gray-800 mb-4">Please Enter Your Name:</div>
          <input 
            v-model="customerName"
            type="text"
            placeholder="Enter your Name"
            class="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button 
            type="submit"
            class="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-2 rounded-md mb-4"
          >
            Proceed
          </button>
        </form>

        <!--YOUR CART-->
        <h2 class="text-xl font-bold text-gray-800 mb-4">Your Cart</h2>

        <div v-if="orderItems.length > 0">
          <!-- Order Items List -->
          <div v-for="(item, index) in orderItems" :key="index" class="order-item flex items-center justify-between border-b pb-4 mb-4">
              <div class="item-details ml-2">
                <h3 class="text-md font-semibold text-gray-700">{{ item.product.name }}</h3>
                <p class="text-lg text-gray-500">₱{{ item.product.price }}</p>
                <div class="flex items-center mt-2">
                  <button @click="updateQuantity(item, -1)" class="text-gray-500 hover:text-gray-700 px-2 py-1">-</button>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item, 1)" class="text-gray-500 hover:text-gray-700 px-2 py-1">+</button>
                </div>
              </div>
              <div class="item-actions text-right">
                <p class="text-md font-semibold text-gray-800">₱{{ (item.product.price * item.quantity) }}</p>
                <button @click="removeItem(item)" class="text-red-500 text-sm mt-2 hover:underline">Remove</button>
              </div>
            </div>


          <!-- Subtotal, Delivery Fee, and Total Price -->
          <div class="order-summary mt-6">
            <div class="flex justify-between text-lg font-bold text-gray-800 mb-4">
              <span>Total Price:</span>
              <span>₱{{ totalPrice }}</span>
            </div>
            <button @click="checkout" class="w-full bg-green-400 hover:bg-green-600 text-white font-bold py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">
          Your cart is empty. Start adding items from the menu!
        </div>
      </div>

      <!-- Your Order Section -->
  <div class="order-details-container bg-white border rounded-lg p-6 w-full mt-6">
  <h2 class="text-xl font-bold text-gray-800 mb-8">Order Summary</h2>


  <div v-if="orderedItems.length > 0">
    <div v-for="(item, index) in orderedItems" :key="index" class="order-item flex items-center justify-between border-b pb-2 mb-2">
      <div class="item-details">
        <p class="text-lg font-semibold text-black mb-2">{{ item.product.name }}</p>
        <p class="text-md text-gray-500">Quantity: {{ item.quantity }}</p>
      </div>
      <p class="text-md font-semibold text-gray-800">₱ {{ (item.product.price * item.quantity) }}</p>
    </div>
  </div>
  <div v-else class="text-center text-gray-500">
    No orders placed yet.
  </div>

  <button @click="checkout" class="mt-4 bg-green-500 text-white py-1 px-3 rounded">Checkout</button>
</div>

      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import banner from '../assets/images/banner.png';

// Product-related state
const tabs = [
  { name: 'milkTea', label: 'Milk Tea', icon: 'fas fa-coffee' },
  { name: 'shakes', label: 'Shakes', icon: 'fas fa-blender' },
  { name: 'foods', label: 'Food', icon: 'fas fa-hamburger' }
];

const currentTab = ref('milkTea');
const loading = ref(false);
const products = ref([]);
const error = ref(null);

// Cart-related state
const orderItems = ref([]);
const selectedSizes = ref({});
const selectedQuantities = ref({});
const selectedPrices = ref({});
const customerName = ref('');
const totalPrice = ref(0);
const orderedItems = ref([]);

// Fetch products based on selected category
const fetchProducts = async (category) => {
  currentTab.value = category;
  loading.value = true;
  error.value = null;
  products.value = [];
  selectedPrices.value = {}; 

  try {
    let apiUrl = '';
    switch (category) {
      case 'foods':
        apiUrl = 'http://127.0.0.1:8000/api/foods';
        break;
      case 'shakes':
        apiUrl = 'http://127.0.0.1:8000/api/shakes';
        break;
      case 'milkTea':
        apiUrl = 'http://127.0.0.1:8000/api/beverages';
        break;
    }

    const response = await axios.get(apiUrl);
    products.value = response.data.data || [];
    for (const product of products.value) {
      if (!selectedPrices.value[product.name]) {
        selectedPrices.value[product.name] = product.price; 
      }
    }
  } catch (err) {
    error.value = 'Failed to load products. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Group products by name and size
const groupedProducts = computed(() => {
  return products.value.reduce((groups, product) => {
    const { name, price, size } = product;
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push({ ...product, size, price });
    return groups;
  }, {});
});

const viewCart = async () => {
  const tableId = localStorage.getItem('tableId');
  console.log("Table ID:", tableId);

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${tableId}/orders`);

    if (response.data.success) {
      orderItems.value = response.data.data; 
      totalPrice.value = response.data.total; 
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    toast.error("Failed to fetch cart items. Please try again.");
  }
};

const viewOrdered = async () => {
  const tableId = localStorage.getItem('tableId');
  
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${tableId}/ordered`);

    if (response.data.success) {
      orderedItems.value = response.data.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching ordered items:", error);
    toast.error("Failed to fetch ordered items. Please try again.");
  }
};




// Add item to cart
const addToCart = async (item) => {
  const tableId = localStorage.getItem('tableId');

  const selectedProduct = groupedProducts.value[item.name].find(
    (p) => p.size === item.size
  );

  if (!selectedProduct) {
    toast.error("Failed to find the product with the selected size.");
    return; 
  }

  const productId = selectedProduct.pkProductId;
  const quantity = item.quantity;

  if (!quantity) {
    toast.error("Quantity is required.");
    return;
  }

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/${tableId}/${productId}/add-order`, 
      { quantity } 
    );
    
    if (response.data.success) {
      toast.success(response.data.message);
      console.log('Adding to cart:', item);
      await viewCart(); 
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    toast.error("Failed to add item to cart. Please try again.");
  }
};


// Remove item from cart
const removeItem = async (item) => {
  const tableId = item.fkTableId; 
  const productId = item.fkProductId;

  console.log('Deleting item with ID:', productId, 'from table:', tableId); 

  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/${tableId}/${productId}/delete-order`);

    if (response.data.success) {
      await viewCart(); 
      toast.success(`${item.product.name} removed from cart!`); 
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error('Error removing item:', error.response?.data); 
    toast.error("Error removing item from cart: " + (error.response?.data?.message || error.message));
  }
};

// Update quantity of items in the cart
const updateQuantity = (item, change) => {
  const existingItem = orderItems.value.find((i) => i.name === item.name && i.size === item.size);
  if (existingItem) {
    existingItem.quantity += change;
    if (existingItem.quantity <= 0) {
      removeItem(orderItems.value.indexOf(existingItem));
    }
  }
};

// Checkout process
const checkout = async () => {
  try {
    const tableId = localStorage.getItem('tableId');
    if (!tableId) {
      toast.error('No table number found. Please provide a valid table number.');
      return;
    }

    const response = await axios.post(`http://127.0.0.1:8000/api/${tableId}/checkout`, {
      customerName: customerName.value,
    });

    if (response.status === 200) {
      toast.success('Checkout successful!');
      orderItems.value = [];
      totalPrice.value = 0;
      await viewOrdered();
    }
  } catch (error) {
    toast.error('Checkout failed. Please try again.');
  }
};

// Change product size and update price
const updatePrice = (name, sizeOption) => {
  const product = groupedProducts.value[name].find((p) => p.size === sizeOption);
  if (product) {
    selectedPrices.value[name] = product.price; 
  } else {
    selectedPrices.value[name] = 0; 
  }
};

// Get available size options for a product
const sizeOptions = (name) => {
  return groupedProducts.value[name].map((p) => p.size);
};

// Change product quantity
const changeQuantity = (name, change) => {
  selectedQuantities.value[name] = (selectedQuantities.value[name] || 1) + change;
  if (selectedQuantities.value[name] <= 0) {
    selectedQuantities.value[name] = 1;
  }
};

// Submit customer name
const submitCustomerName = async () => {
  const tableId = localStorage.getItem('tableId');
  if (!tableId) {
    toast.error('No table number found. Please provide a valid table number.');
    return;
  }

  const namePattern = /^[A-Za-z\s]+$/; 
  if (!namePattern.test(customerName.value)) {
    toast.error('Please enter a valid name (letters only).');
    return;
  }

  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/${tableId}/add-customer-name`, {
      customerName: customerName.value,
    });

    if (response.data.success) {
      toast.success('Name added successfully!');
    } else {
      toast.error(response.data.message || 'Failed to add name. Please try again.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add name. Please try again.';
    toast.error(errorMessage);
  }
};


onMounted(async () => {
  await fetchProducts('milkTea');
  await viewCart();
  await viewOrdered();
});
</script>



<style scoped>
.tabs-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #e2e8f0;
}

.tab {
  padding: 0.75rem;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: #4a5568;
  position: relative;
}

.tab.active {
  color: #48bb78;
}

.tabs-bar {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: calc(100% / 3);
  background-color: #48bb78;
  transition: left 0.3s;
}

.form-radio:checked {
  background-color: #48bb78;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.item-actions {
  text-align: right;
}

.item-details h3 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

</style>
