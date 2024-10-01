
<template>
  <div id="app">
    <Header />
    <SidebarComponent />

    <div 
    class="pt-[64px] pl-[200px]"
    >

    <router-view />

    </div>
 
  </div>
</template>


<script setup lang="ts">
import Header from '@/components/Header.vue';

import SidebarComponent from '@/components/side-bar/Sidebar.vue';

</script>
