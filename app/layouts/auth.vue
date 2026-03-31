<script setup lang="ts">
import AppHeader from "~/components/layout/AppHeader.vue";
</script>

<template>
  <AppHeader :open="false" />
  <main
    class="h-screen flex justify-center items-center py-5 bg-[#edf2fe] pt-18 md:pt-20"
  >
    <slot />
  </main>
</template>
