
<template>
  <div id="app">
    <Header />
    <SidebarComponent />

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>


<script setup lang="ts">
import Header from '@/components/Header.vue';

import SidebarComponent from '@/components/Sidebar.vue';

</script>
