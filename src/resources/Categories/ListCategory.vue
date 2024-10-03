<script setup lang="ts">
import { ICategory } from "@/types/global";
import { onMounted, reactive, ref } from "vue";
import List from "../base/list.vue";
import { TableCell, TableHead } from "@/components/ui/table";
import axios from "axios";
import { CATEGORY_ENDPOINTS } from "@/api/endpoints";
import router from "@/router";

const loading = ref<boolean>(false);

const tableAction = [
  {
    label: "Edit",
    apply: (item: ICategory) => {
      if (item.id) {
        router.push(`/products/${item.id}/edit`);
      }
    },
  },
  {
    label: "Delete",
    apply: (item: ICategory) => {
      console.log("Delete", item);
    },
  },
];

const headerActions = [
  {
    label: `Add ${router.currentRoute.value.path.split('/')[1].toLocaleLowerCase()}`,
    apply: () => {
      router.push(`${router.currentRoute.value.path}/create`);
    },
  },
];


const componentInfo = reactive({
  title: "Categories",
  breadcrumb: [
    { text: "Home", href: "/" },
    { text: "Categories", href: "/categories" },
  ],
  items: [] as ICategory[],
  headerActions: headerActions,
  tableAction: tableAction,
  loading: loading,
});


onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get(
      `${CATEGORY_ENDPOINTS.GET_CATEGORIES}?offset=10&limit=10`
    );
    
    componentInfo.items = response.data;

    router.go(1);
  } catch (error: any) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <List
    :title="componentInfo.title"
    :breadcrumb-items="componentInfo.breadcrumb"
    :items="componentInfo.items"
    :headerActions="componentInfo.headerActions"
    :tableAction="componentInfo.tableAction"
    :loading="componentInfo.loading"
  >
    <template #widget>
    </template>

    <template #header>
      <TableHead class="">id</TableHead>
      <TableHead class="">title</TableHead>
    </template>

    <template #row="{ item }">
      <TableCell>{{ item.id }}</TableCell>
      <TableCell>{{ item.name }}</TableCell>
    </template>
  </List>
</template>
