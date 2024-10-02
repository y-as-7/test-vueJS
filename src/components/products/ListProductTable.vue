<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import router from "@/router";

const { products } = defineProps<{
  products: Product[];
}>();
</script>

<template>
  <Table class="w-full">
    <TableCaption>A list of your recent products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">ID</TableHead>
        <TableHead class="w-[100px]">Image</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="text-right">Price</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <!-- Loop through products and render a TableRow for each -->
      <TableRow
        @click="() => router.push(`/products/${product.id}/edit`)"
        v-for="product in products"
        :key="product.id"
      >
        <TableCell class="font-medium">{{ product.id }}</TableCell>
        <TableCell>
          <img
            class="w-12 h-12 object-cover rounded-lg"
            :src="product.images[0]"
            alt="product image"
          />
        </TableCell>
        <TableCell>{{ product.title }}</TableCell>
        <TableCell>
          <div class="line-clamp-3" v-html="product.description"></div>
        </TableCell>
        <TableCell class="text-right">{{ product.price }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
