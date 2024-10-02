<template>
  <div class="flex justify-between items-center">
    <h1>
      <span class="text-2xl font-semibold text-gray-800">
        {{ title }}
      </span>
    </h1>

    <div class="flex items-center gap-x-2">
      <button
        v-for="action in headerActions"
        @click="action.apply"
        class="bg-primary text-white font-bold py-2 px-4 rounded"
      >
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { title, headerActions = [] } = defineProps<{
  title: string;
  headerActions: { label: string; apply: () => void }[];
}>();
</script>
