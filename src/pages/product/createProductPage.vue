<template>
    <div class="p-8">
      <div class="pt-4">
        <BreadCrumb :breadcrumbItems="breadcrumbItems" />
      </div>
      <div class="py-2">
        <Navbar 
        title="Products"
        :actionName=null
        :actionLink=null
        />
      </div>

      <div class="py-12">
        <ProductForm />
      </div>
    
    </div>
  </template>

<script setup lang="ts">

import BreadCrumb from "@/components/dashbord/BreadCrumb.vue";
import Navbar from "@/components/dashbord/Navbar.vue";
import ProductForm from "@/components/products/ProductForm.vue";

const breadcrumbItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Products",
    href: "/products",
  },
  {
    text: "Create Product",
    href: "/products/create",
  }
];

</script>