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
    class="absolute top-0 left-0 right-0 z-50 h-18 md:h-20 px-4 md:px-6 flex items-center justify-between md:justify-end bg-[#fbfdff]"
  >
    <button
      :class="[
        'md:hidden',
        profile === null
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto',
      ]"
      @click="emit('toggleDrawer')"
    >
      <IconX :size="28" v-if="open" />
      <IconMenu :size="28" v-else />
    </button>
    <div
      v-if="profile === null"
      class="h-full w-full md:w-1/5 flex justify-evenly items-center"
    >
      <NuxtLink
        to="/auth/login"
        class="h-12 w-1/3 flex items-center justify-center hover:cursor rounded-lg shadow-sm hover:bg-[#3e63dd] hover:text-[#fbfdff] transition-all duration-300 ease-in-out hover:-translate-y-0.5 after:absolute after:left-1/2 after:bottom-1.5 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >Se connecter</NuxtLink
      >
      <NuxtLink
        to="/auth/register"
        class="h-12 w-1/3 flex items-center justify-center hover:cursor rounded-lg shadow-sm hover:bg-[#3e63dd] hover:text-[#fbfdff] transition-all duration-300 ease-in-out hover:-translate-y-0.5 after:absolute after:left-1/2 after:bottom-1.5 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >S'inscrire</NuxtLink
      >
    </div>
    <div
      v-else
      class="w-full md:w-1/5 h-full flex justify-end items-center gap-3 pr-3"
    >
      <div
        class="flex size-10 items-center justify-center rounded-full text-xl"
        :style="{ backgroundColor: getColorFromUsername(profile.displayName) }"
      >
        <img
          v-if="profile.avatarUrl"
          :src="profile.avatarUrl"
          alt="avatar du profile"
        />
        <span v-else>{{
          profile.displayName.split("")[0]?.toUpperCase()
        }}</span>
      </div>
      <span class="font-medium text-xl">{{ profile.displayName }}</span>
    </div>
  </header>
</template>
