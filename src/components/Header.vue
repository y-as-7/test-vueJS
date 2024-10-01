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

<script lang="ts">
import { Icon, icons } from 'lucide-vue-next';

export default {
  name: "pink-navbar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>
