<script setup lang="ts">
import BreadCrumb from "@/components/BreadCrumb.vue";
import Navbar from "@/components/dashbord/Navbar.vue";
import { defineProps } from "vue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IBreadCrumb } from "@/types/global";
import router from "@/router";

const props = defineProps<{
  items: any[];
  title: string;
  breadcrumbItems: IBreadCrumb[];
  headerActions: { label: string; apply: () => void }[];
  loading: boolean;
}>();
</script>

<template>
  <div class="p-8">
    <div class="pt-4">
      <BreadCrumb :breadcrumbItems="breadcrumbItems" />
    </div>

    <div class="py-2">
      <Navbar :title="title" :headerActions="headerActions" />
    </div>


    <!-- make all items is same hieght -->
    <div class="py-2 w-full gap-4  grid grid-cols-1 lg:grid-cols-2 items-center h-max">
      <slot name="widget" />
    </div>

    <div class="py-12">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
           <slot name="header" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading">
            <TableCell>Loading...</TableCell>
          </TableRow>
          <TableRow 
          @click="() => router.push(`/${title.toLocaleLowerCase()}/${item.id}/edit`)"
          v-else v-for="item in props.items" :key="item.id">
            <slot name="row" :item="item" />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
