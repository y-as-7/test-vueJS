<template>
  <nav
    class="fixed left-0 flex flex-col px-8 py-12 bg-slate-800 min-h-screen text-white w-[200px] gap-y-4 mt-[64px]"
  >
    <sideBarItem
      v-for="item in sideItems"
      :key="item.id"
      :title="item.title"
      :link="item.link"
      :icon="item.icons"
    />


  </nav>
</template>

<script lang="ts" setup>
import sideBarItem from "./side-bar-item.vue";
import { sideBarNavItems } from "@/constants";

const sideItems = sideBarNavItems;

</script>
