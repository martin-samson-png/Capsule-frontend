<script setup lang="ts">
import {
  IconHome,
  IconChartPie,
  IconArrowLeftRight,
  IconGoal,
} from "#components";
const props = defineProps<{ open: boolean }>();

const emit = defineEmits(["close"]);

const navItems = [
  { label: "Acceuil", to: "/dashboard", icon: IconHome },
  { label: "Graphique", to: "/charts", icon: IconChartPie },
  { label: "Transactions", to: "transactions", icon: IconArrowLeftRight },
  { label: "Objectifs", to: "/goals", icon: IconGoal },
];
</script>

<template>
  <aside
    class="bg-red-800 fixed max-h-screen h-full left-0 z-50 w-3/5 max-w-xs md:max-w-50 transform transition-transform px-3 py-5"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full flex flex-col justify-between">
      <div class="space-y-5">
        <button
          type="button"
          aria-label="Fermer le menu"
          class="md:hidden mx-2"
          @click="emit('close')"
        >
          <IconX :size="28" />
        </button>

        <nav class="py-2 md:flex md:justify-center">
          <ul class="space-y-7 w-full">
            <li
              v-for="nav in navItems"
              :key="nav.to"
              class="bg-blue-200 rounded-4xl min-h-12 flex px-2"
            >
              <NuxtLink :to="nav.to" class="flex items-center gap-5"
                ><component :is="nav.icon" :size="28" /><span
                  class="font-semibold"
                  >{{ nav.label }}</span
                ></NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </aside>
</template>
