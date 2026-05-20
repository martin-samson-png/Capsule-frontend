<script setup lang="ts">
import type { GoalForm } from "~/types/goals";
import GoalsFields from "../form/goals/GoalsFields.vue";
import BaseButton from "../BaseButton.vue";
import { useGoals } from "~/composable/goals/useGoals";
import { useToast } from "~/composable/useToast";

const { loading, createGoal, fetchGoals } = useGoals();
const { showToast } = useToast();

const emit = defineEmits(["close"]);

const getInitialForm = (): GoalForm => ({
  label: "",
  targetAmount: null,
  deadline: "",
  icon: "",
});

const form = reactive<GoalForm>(getInitialForm());

const resetForm = () => {
  Object.assign(form, getInitialForm());
};

const handleSubmit = async () => {
  try {
    console.log("essaie 1");

    let result;
    result = await createGoal(form);
    if (result) {
      let successMessage = "Objectif créé avec succès";
      showToast(successMessage);
      emit("close");
      resetForm();
      await fetchGoals();
    }
  } catch (err) {
    // Erreur gérée par le watch global dans index.vue
    // On catch uniquement pour stopper l'exécution de handleSubmit}
  }
};
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
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
