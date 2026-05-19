<script setup lang="ts">
import { useProfile } from "~/composable/useProfile";

const { profile } = useProfile();

const props = defineProps<{ open: boolean }>();

const emit = defineEmits(["toggleDrawer"]);

const colors = [
  "#FECACA",
  "#FED7AA",
  "#FEF08A",
  "#BBF7D0",
  "#BFDBFE",
  "#C7D2FE",
  "#DDD6FE",
  "#FBCFE8",
  "#A7F3D0",
  "#E9D5FF",
];

const getColorFromUsername = (username: string) => {
  const firstletter = username.trim().codePointAt(0) || 0;
  return colors[firstletter % colors.length];
};
</script>

<template>
  <header
    class="absolute z-60 top-0 left-0 right-0 z-50 h-18 lg:h-20 px-4 lg:px-6 flex items-center justify-between lg:justify-end bg-[#fbfdff]"
  >
    <ClientOnly>
      <button
        :class="[
          'lg:hidden',
          profile === null
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto',
        ]"
        @click="emit('toggleDrawer')"
      >
        <IconX :size="28" v-if="open" />
        <IconMenu :size="28" v-else />
      </button>
    </ClientOnly>

    <ClientOnly>
      <div
        v-if="profile === null"
        class="h-full w-full lg:w-1/5 flex justify-evenly items-center"
      >
        <NuxtLink
          to="/auth/login"
          class="relative inline-block px-4 py-2 rounded-lg font-medium text-gray-700 bg-white shadow-sm border border-gray-200 transition-all duration-300 ease-in-out hover:bg-[#3E63DD] hover:text-blue-700 hover:-translate-y-0.5 after:absolute after:left-1/2 after:bottom-1.5 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
          >Se connecter</NuxtLink
        >
        <NuxtLink
          to="/auth/register"
          class="relative inline-block px-4 py-2 rounded-lg font-medium text-gray-700 bg-white shadow-sm border border-gray-200 transition-all duration-300 ease-in-out hover:bg-[#3E63DD] hover:text-blue-700 hover:-translate-y-0.5 after:absolute after:left-1/2 after:bottom-1.5 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
          >S'inscrire</NuxtLink
        >
      </div>

      <div
        v-else
        class="w-full lg:w-1/5 h-full flex justify-end items-center gap-3 pr-3"
      >
        <div
          class="flex size-10 items-center justify-center rounded-full text-xl"
          :style="{
            backgroundColor: getColorFromUsername(profile.displayName),
          }"
        >
          <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="avatar" />
          <span v-else>{{
            profile.displayName.split("")[0]?.toUpperCase()
          }}</span>
        </div>
        <span class="font-medium text-xl">{{ profile.displayName }}</span>
      </div>

      <template #fallback>
        <div class="w-full lg:w-1/5 h-full flex justify-end items-center px-4">
          <div
            class="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
          ></div>
        </div>
      </template>
    </ClientOnly>
  </header>
</template>
