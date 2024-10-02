<script setup lang="ts">
const props = defineProps<{
  items: any[];
  actions: { label: string; apply: (id: number) => void }[];
  loading: boolean;
}>();

</script>

<template>
  <div>
    <h1>
        <slot name="title" />
    </h1>
    <table>
      <thead>
        <tr>
          <slot name="header" />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!loading" v-for="item in props.items" :key="item.id">
          <slot name="row" :item="item" />
          <td>
            <button v-for="action in props.actions" @click="action.apply(item.id)">{{ action.label }}</button>
          </td>
        </tr>
        <div v-else>
          <h1>Loading...</h1>
        </div>
      </tbody>
    </table>
  </div>
</template>