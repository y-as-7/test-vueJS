<script setup lang="ts">
import { Product } from "@/types/global";
import { onMounted, ref } from "vue";
import List from "../base/list.vue";
import router from "@/router";
import { TableCell, TableHead } from "@/components/ui/table";
import axios from "axios";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";
import ProductWidget from "./Widgets/ProductWidget.vue";
import ProductDountChart from "./Widgets/ProductDountChart.vue";

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(PRODUCT_ENDPOINTS.GET_PRODUCTS);
    products.value = response.data;
  } catch (error: any) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const loading = ref<boolean>(false);
const headerActions = [
  {
    label: "Add Product",
    apply: () => {
      router.push("/products/create");
    },
  },
];
</script>

<template>
  <List
    title="Products"
    :breadcrumb-items="[
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
    ]"
    :items="products"
    :headerActions="headerActions"
    :loading="loading"
  >
    <template #widget>
      <ProductWidget />
      <ProductDountChart />
    </template>

    <template #header>
      <TableHead class="">title</TableHead>
      <TableHead class="">Description</TableHead>
      <TableHead class="">Price</TableHead>
    </template>

    <template #row="{ item }">
      <TableCell>{{ item.title }}</TableCell>
      <TableCell class="max-w-xs">{{ item.description }}</TableCell>
      <TableCell>{{ item.price }}</TableCell>
    </template>
  </List>
</template>
