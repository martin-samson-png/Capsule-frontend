<script setup lang="ts">
import AppDrawer from "~/components/layout/AppDrawer.vue";
import AppHeader from "~/components/layout/AppHeader.vue";

const isDrawerOpen = ref(true);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};
</script>
<template>
  <AppHeader @toggle-drawer="toggleDrawer" />
  <AppDrawer class="md:mt-16" @close="closeDrawer" :open="isDrawerOpen" />
  <main class="pt-14 md:pt-16 px-4 md:px-30 lg:px-8 bg-[#EDF2FE]">
    <slot></slot>
  </main>
</template>
