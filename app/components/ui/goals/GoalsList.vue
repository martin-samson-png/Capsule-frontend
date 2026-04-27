<script setup lang="ts">
import type { Goal } from "~/types/goals";
import GoalsCard from "./GoalsCard.vue";

defineProps<{ goals: Goal[] }>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    <GoalsCard v-for="goal in goals" :goal="goal" />
  </div>
</template>
