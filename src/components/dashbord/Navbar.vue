<template>
  <div class="flex justify-between items-center">
    <h1>
      <span class="text-2xl font-semibold text-gray-800">
        {{ title }}
      </span>
    </h1>

    <a
      v-if="actionName && actionLink"
      :href="actionLink || '#'"
      class="bg-primary text-white font-bold py-2 px-4 rounded"
    >
      {{ actionName ??  'Action' }}
    </a>
  </div>
</template>

<script setup lang="ts">
const {
  title,
  actionName = null,
  actionLink = null,
} = defineProps<{
  title: string;
  actionName: null | string;
  actionLink: null | string;
}>();
</script>
