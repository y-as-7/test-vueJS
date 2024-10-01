<template>
  <div class="p-8">
    <div class="pt-4">
      <BreadCrumb :breadcrumbItems="breadcrumbItems" />
    </div>
    <div class="py-2">
      <Navbar 
      title="Products"
      actionName="Add Product"
      actionLink="/products/create"
      />
    </div>
    <div class="py-12">
      <ProductTable 
      :products="products"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from "@/components/dashbord/BreadCrumb.vue";
import Navbar from "@/components/dashbord/Navbar.vue";
import ProductTable from "@/components/products/ListProductTable.vue";
import axios from "@/api/axios";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";
import { ref, onMounted } from 'vue';

const breadcrumbItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Products",
    href: "/products",
  },
];


const products = ref<Product[]>([]);

onMounted(async () => {
  const response = async () => {
  try {
    const response = await axios.get(PRODUCT_ENDPOINTS.GET_PRODUCTS);
    console.log(await response.data);
    
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
  const data = await response();
  products.value = data;
});




</script>
