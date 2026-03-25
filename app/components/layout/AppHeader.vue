<script setup lang="ts">
const emit = defineEmits(["toggleDrawer"]);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 px-4 md:px-6 flex items-center justify-between md:justify-end bg-green-300"
  >
    <button class="md:hidden" @click="emit('toggleDrawer')">
      <IconMenu :size="28" />
    </button>
    <div><button>Se connecter</button></div>
  </header>
</template>
