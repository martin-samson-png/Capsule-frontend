<script setup lang="ts">
import { useGoalModal } from "~/composable/goals/useGoalsModal";
import BaseButton from "../BaseButton.vue";

const { openGoalModal } = useGoalModal();
</script>

<template>
  <BaseButton
    @click="openGoalModal"
    class="fixed bottom-6 right-6 z-50 !h-14 !w-14 !rounded-full !p-0 flex items-center justify-center md:static md:h-12 md:w-auto md:min-w-40 md:!rounded-xl md:px-4 md:gap-2"
  >
    <IconCirclePlus :size="28" />
    <span class="hidden md:inline">Ajouter</span>
  </BaseButton>
</template>
