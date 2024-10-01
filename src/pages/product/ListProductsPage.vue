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
import ProductTable from "@/components/products/ProductTable.vue";
import { Product } from "@/types/global";

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

const products: Product[] = [
  {
    id: 1,
    title: "Product Title",
    description: "Product Description",
    price: "10",
    image_url: "https://example.com/image.jpg",
    created_at: "2024-10-01T07:38:36.000Z",
  },
  {
    id: 2,
    title: "Product Title",
    description: "Product Description",
    price: "10",
    image_url: "https://example.com/image.jpg",
    created_at: "2024-10-01T07:38:43.000Z",
  },
];
</script>
