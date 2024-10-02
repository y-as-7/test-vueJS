<script setup lang="ts">
import { Product } from "@/types/global";
import { onMounted, ref } from "vue";
import List from "../base/list.vue";
import { TableCell, TableHead } from "@/components/ui/table";
import axios from "axios";
import { PRODUCT_ENDPOINTS } from "@/api/endpoints";
import ProductWidget from "./Widgets/ProductWidget.vue";
import ProductDountChart from "./Widgets/ProductDountChart.vue";
import router from "@/router";

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(
      `${PRODUCT_ENDPOINTS.GET_PRODUCTS}?offset=10&limit=10`
    );
    products.value = response.data;

    router.go(1);
  } catch (error: any) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const loading = ref<boolean>(false);

const tableAction = [
  {
    label: "Edit",
    apply: (item: Product) => {
      if (item.id) {
        router.push(`/products/${item.id}/edit`);
      }
    },
  },
  {
    label: "Delete",
    apply: (item: Product) => {
      console.log("Delete", item);
    },
  },
];

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
    :tableAction="tableAction"
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
