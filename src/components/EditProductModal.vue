<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">Edit Product</h2>

      <form @submit.prevent="saveChanges">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Product Name</label>
          <input v-model="product.name" type="text" class="mt-1 p-2 w-full border rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <input v-model="product.category" type="text" class="mt-1 p-2 w-full border rounded" required />
        </div>

       <!-- Pricing for Each Size -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-2">Set Prices for Sizes</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Small</label>
              <input v-model.number="newProduct.prices.small" :disabled="isFoodCategory" type="number" class="mt-1 p-2 w-full border rounded" placeholder="₱ Price for Small" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Medium</label>
              <input v-model.number="newProduct.prices.medium" :disabled="isFoodCategory" type="number" class="mt-1 p-2 w-full border rounded" placeholder="₱ Price for Medium" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Large</label>
              <input v-model.number="newProduct.prices.large" :disabled="isFoodCategory" type="number" class="mt-1 p-2 w-full border rounded" placeholder="₱ Price for Large" />
            </div>
          </div>
        </div>


        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Upload Product Image</label>
          <input type="file" @change="handleImageUpload" class="mt-1 p-2 w-full border rounded" />
        </div>

        <div class="flex justify-end">
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="$emit('close')">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineEmits } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const localProduct = ref({ ...props.product });

watch(() => props.product, (newProduct) => {
  localProduct.value = { ...newProduct };
});

const handleImageUpload = (event) => {
  localProduct.value.image = event.target.files[0];
};

const saveChanges = () => {
  emit('save', localProduct.value);
};
</script>

