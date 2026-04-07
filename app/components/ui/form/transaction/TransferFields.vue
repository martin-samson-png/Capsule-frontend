<script setup lang="ts">
import type { CreateTransaction } from "~/types/transactions";
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useCategories } from "~/composable/categories/useCategories";
import type { OptionProps } from "~/types/forms";
import BaseSelect from "../../BaseSelect.vue";

defineProps<{ modelValue: CreateTransaction }>();

const { accounts } = useAccounts();
const { categories } = useCategories();

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

const selectCategory = computed<OptionProps[]>(() =>
  categories.value.map((c) => ({ label: c.label, value: c.id })),
);
</script>

<template>
  <BaseSelect
    id="fromAccount"
    label="Compte sourcer"
    :options="selectAccounts"
    v-model="modelValue.fromAccountId"
  />
  <BaseSelect
    id="toAccount"
    label="Compte destination"
    :options="selectAccounts"
    v-model="modelValue.toAccountId"
  />
  <BaseSelect
    id="category"
    label="Catégorie"
    :options="selectCategory"
    v-model="modelValue.categoryId"
  />
</template>
