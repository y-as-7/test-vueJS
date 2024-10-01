<template>
  <nav class="fixed flex items-center justify-between px-8 py-4 bg-primary w-full text-white">
    <router-link
    class="text-2xl font-bold"
    to="/">Rizme</router-link>

    <div>
      <h1 class="text-2xl  cursor-pointer">
        Profile
      </h1>
    </div>

  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showMenu = ref(false);

const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
}
</script>
