<script setup lang="ts">
import type { GoalForm } from "~/types/goals";
import GoalsFields from "../form/goals/GoalsFields.vue";
import BaseButton from "../BaseButton.vue";
import { useGoals } from "~/composable/goals/useGoals";

const { loading } = useGoals();

const getInitialForm = (): GoalForm => ({
  label: "",
  targetAmount: null,
  deadline: formatDateForInput(new Date()),
  icon: "",
});

const form = reactive<GoalForm>(getInitialForm());
</script>
<template>
  <form
    @submit.prevent=""
    class="flex flex-col items-center px-5 py-7 w-7/8 gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3 max-h-[90vh] overflow-y-auto"
  >
    <h1 class="mb-5 text-3xl font-semibold">Nouvel objectif</h1>
    <div class="flex flex-col gap-5 w-full">
      <GoalsFields v-model="form" />
    </div>
    <BaseButton
      type="submit"
      :loading="loading"
      :disabled="!form.label || !form.targetAmount"
      >Créer</BaseButton
    >
  </form>
</template>
