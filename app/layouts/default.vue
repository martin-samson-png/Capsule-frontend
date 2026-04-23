<script setup lang="ts">
import AppDrawer from "~/components/layout/AppDrawer.vue";
import AppHeader from "~/components/layout/AppHeader.vue";
import ContextBar from "~/components/layout/ContextBar.vue";
import { navItems } from "~/constant/navigation";
import { IconHome } from "#components";
import AppToast from "~/components/layout/AppToast.vue";

const route = useRoute();

const currentNavItem = computed(() =>
  navItems.find((i) => i.to === route.path),
);

const pageContext = computed(() => {
  const title = currentNavItem.value?.label ?? "Page";
  const icon = currentNavItem.value?.icon ?? IconHome;
  const filters = currentNavItem.value?.filter ?? null;

  return { title, icon, filters };
});

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
<template>
  <AppHeader @toggle-drawer="toggleDrawer" :open="isDrawerOpen" />
  <AppDrawer class="pt-18 md:pt-20" :open="isDrawerOpen" />
  <AppToast />
  <main class="pt-18 md:pt-20 md:pl-72 bg-[#edf2fe] min-h-screen">
    <ContextBar :context="pageContext" />
    <div class="px-4 md:px-6 lg:px-8">
      <slot />
    </div>
  </main>
</template>
