<script setup lang="ts">
import GoalsList from "~/components/ui/goals/GoalsList.vue";
import TransactionsFormModal from "~/components/ui/transactions/TransactionsFormModal.vue";
import { useGoals } from "~/composable/goals/useGoals";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";
import { useToast } from "~/composable/useToast";
import type { Goal } from "~/types/goals";

const { fetchGoals, goals, loading } = useGoals();

const { error } = useTransactions();

const { showToast } = useToast();

const { isModalOpen, openForContribution, closeModal } = useTransactionModal();

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

const handleContribute = (goal: Goal) => {
  openForContribution(goal);
};

watch(error, (newError) => {
  if (newError) {
    showToast(newError, "error");
    setTimeout(() => {
      error.value = null;
    }, 2000);
  }
});
</script>
<template>
  <div
    v-if="loading"
    class="flex flex-col items-center justify-center min-h-[200px] w-full"
  >
    <div
      class="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
    ></div>
  </div>
  <GoalsList
    v-else-if="goals"
    :goals="sortedGoals"
    @contribute="handleContribute"
  />
  <div v-else><span>Aucun objectif trouvé</span></div>
  <div
    @click.self="closeModal"
    v-if="isModalOpen"
    class="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4"
  >
    <TransactionsFormModal @close="closeModal" />
  </div>
</template>
