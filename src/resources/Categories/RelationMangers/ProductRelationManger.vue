<script setup lang="ts">
import { TableCell, TableRow } from "@/components/ui/table";
import RelationManger from "@/resources/base/components/RelationManger.vue";

import { defineProps, toRaw } from "vue";

const props = defineProps<{
  items: any[];
  tableAction: any[];
}>();
</script>

<template>
  <RelationManger>
    <template v-slot:header>
      <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Price</TableCell>
      </TableRow>
    </template>

    <template v-slot:body>
      <TableRow v-for="item in items" :key="item.id">
        <TableCell>{{ item.id }}</TableCell>
        <TableCell>{{ item.title }}</TableCell>
        <TableCell>{{ item.price }}</TableCell>
      </TableRow>
    </template>
  </RelationManger>
</template>
