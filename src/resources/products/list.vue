<script setup lang="ts">
import { Product } from '@/types/global';
import { ref } from 'vue';
import List from '../base/list.vue';


const products = ref<Product[]>([]);
const loading = ref<boolean>(true);
const actions = [
    {
        label: 'Delete',
        apply: (id: number) => {
            console.log('Delete', id);
        }
    }
];
</script>

<template>
    <List :items="products" :actions="actions" :loading="loading">
        <template #title>
            Products
        </template>
        <template #header>
            <th>Name</th>
            <th>Price</th>
        </template>
        <template #row="{ item }">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
        </template>
    </list>
</template>