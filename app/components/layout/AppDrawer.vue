<script setup lang="ts">
import { navItems } from "~/constant/navigation";

const props = defineProps<{ open: boolean }>();

const emit = defineEmits(["close"]);

const route = useRoute();
</script>

<template>
  <aside
    class="fixed z-50 max-h-screen h-full left-0 min-w-72 transform transition-transform px-3 bg-[#fbfdff] lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full flex flex-col justify-between">
      <nav class="py-2 lg:flex flex-col lg:justify-center space-y-7 w-full">
        <NuxtLink
          @click="$emit('close')"
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-5 rounded-4xl min-h-16 flex px-5',
            route.path === item.to ? 'bg-[#3E63DD] text-[#D6E1FF]' : '',
          ]"
          ><component :is="item.icon" :size="28" /><span
            class="font-semibold"
            >{{ item.label }}</span
          ></NuxtLink
        >
      </nav>
    </div>
  </aside>
</template>
