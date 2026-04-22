<script setup lang="ts">
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useGoals } from "~/composable/goals/useGoals";
import type { OptionProps } from "~/types/forms";
import type { TransactionForm } from "~/types/transactions";
import BaseSelect from "../../BaseSelect.vue";

const props = defineProps<{
  modelValue: TransactionForm;
  isEditing: boolean;
}>();

const { accounts } = useAccounts();
const { goals } = useGoals();

const mainAccount = computed(() =>
  accounts.value.find((a) => a.type === "main"),
);
const savingsAccount = computed(() =>
  accounts.value.find((a) => a.type === "savings"),
);

const selectAccounts = computed<OptionProps[]>(() => [
  ...(mainAccount.value
    ? [{ label: "Compte principal", value: mainAccount.value.id }]
    : []),
  ...(savingsAccount.value
    ? [{ label: "Compte épargne", value: savingsAccount.value.id }]
    : []),
]);

const selectGoal = computed<OptionProps[]>(() => {
  return goals.value
    .filter((g) => g.status === "active")
    .map((g) => ({ label: g.label, value: g.id }));
});
</script>

<template>
  <BaseSelect
    :key="`acc-${selectAccounts.length}`"
    id="fromAccount"
    label="Depuis le compte"
    :options="selectAccounts"
    v-model="modelValue.accountId"
    :disabled="isEditing"
  />

  <BaseSelect
    :key="`goal-${selectGoal.length}`"
    id="goal"
    label="Vers l'objectif"
    :options="selectGoal"
    v-model="modelValue.goalId"
    :disabled="isEditing"
  />
</template>
