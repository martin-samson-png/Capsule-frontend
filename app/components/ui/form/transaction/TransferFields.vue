<script setup lang="ts">
import type { CreateTransaction } from "~/types/transactions";
import { useAccounts } from "~/composable/accounts/useAccounts";
import type { OptionProps } from "~/types/forms";
import BaseSelect from "../../BaseSelect.vue";

const props = defineProps<{ modelValue: CreateTransaction }>();

const { accounts } = useAccounts();

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
</script>

<template>
  <BaseSelect
    :key="`fromAcc-${selectAccounts.length}`"
    id="fromAccount"
    label="Compte source"
    :options="selectAccounts"
    v-model="modelValue.fromAccountId"
  />
  <BaseSelect
    :key="`toAcc-${selectAccounts.length}`"
    id="toAccount"
    label="Compte destination"
    :options="selectAccounts"
    v-model="modelValue.toAccountId"
  />
</template>
