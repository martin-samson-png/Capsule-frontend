<script setup lang="ts">
import GoalsList from "~/components/ui/goals/GoalsList.vue";
import { useGoals } from "~/composable/goals/useGoals";
import type { Goal } from "~/types/goals";

const { fetchGoals, goals } = useGoals();

onMounted(() => {
  fetchGoals();
});

const sortedGoals = computed(() => {
  if (!goals.value) return [];

  return [
    ...goals.value.sort((a: Goal, b: Goal) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status !== "active" && b.status === "active") return 1;

      if (a.status === "active" && b.status === "active") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }

      return 0;
    }),
  ];
});
</script>
<template><GoalsList :goals="sortedGoals" /></template>
