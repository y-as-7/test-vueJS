<template>
   <router-link
     class="text-lg font-bold cursor-pointer flex items-center px-2 py-1 rounded "
     :to="link"
     :class="{ 'bg-gray-400': isActive, '': !isActive }"
   >
     <!-- Dynamically render the icon -->
     <component :is="icon" class="mr-2 w-5 h-5" />
 
     <span
       :class="`text-lg font-bold cursor-pointer flex items-center ${isActive ? 'text-white' : 'text-gray-400'}`"
     >
       {{ title }}
     </span>
   </router-link>
 </template>
 
 <script setup lang="ts">
 import { useRoute } from 'vue-router';
 import { computed } from 'vue';
 
 interface SideBarItemProps {
   title: string;
   link: string;
   icon: any;
 }
 
 const { title, link, icon } = defineProps<SideBarItemProps>();
 
 const route = useRoute();
 
 const isActive = computed(() => route.fullPath === link);
 </script>
 