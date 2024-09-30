<template>
    <div
      v-if="isVisible"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label for="name">Product Name:</label>
            <input
              type="text"
              v-model="product.name"
              id="name"
              required
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              type="number"
              v-model="product.price"
              id="price"
              required
            />
          </div>
          <div class="form-group">
            <label for="size">Size:</label>
            <select v-model="product.size" id="size" required>
              <option v-for="size in sizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="productImage">Product Image:</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
            />
          </div>
          <button type="submit">Update Product</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    productData: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['close', 'update']);
  
  const product = ref({ ...props.productData });
  const sizes = ['Small', 'Medium', 'Large', 'No Size'];
  
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      product.value.productImage = file;
    }
  }
  
  function updateProduct() {
    emit('update', product.value);
    closeModal();
  }
  
  function closeModal() {
    emit('close');
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 15px;
    background-color: #735187;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #623d6a;
  }
  </style>
  