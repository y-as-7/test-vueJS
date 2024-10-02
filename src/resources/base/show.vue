<template>
    <div v-if="!loading">
        <h1>
            <slot name="title" :item="item" />
        </h1>
        <slot name="item" :item="item" />
        <button v-for="action in actions" @click="action.apply(item.id)">{{ action.label }}</button>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
    item: any,
    actions: { label: string; apply: (id: number) => void }[];
    loading: boolean;
}>();

const { item: item, actions, loading } = toRefs(props);
</script>
