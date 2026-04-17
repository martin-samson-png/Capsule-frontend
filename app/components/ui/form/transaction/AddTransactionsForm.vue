<script setup lang="ts">
import type { CreateTransaction } from "~/types/transactions";
import TransferFields from "./TransferFields.vue";
import ContributionFields from "./ContributionFields.vue";
import StandardTransactionFields from "./StandardTransactionFields.vue";
import BaseTransactionFields from "./BaseTransactionFields.vue";
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useToast } from "~/composable/useToast";

const { mainAccount, fetchAccounts } = useAccounts();
const { createTransaction, fetchTransactions, loading } = useTransactions();
const { showToast } = useToast();

const getInitialForm = (): CreateTransaction => ({
  type: "",
  date: new Date().toISOString(),
  amount: null,
  label: "",
  accountId: "",
  fromAccountId: "",
  toAccountId: "",
  categoryId: "",
  goalId: "",
});

const form = reactive<CreateTransaction>(getInitialForm());

const resetForm = () => {
  Object.assign(form, getInitialForm());
};

watch(
  () => form.type,
  (newType, oldType) => {
    if (!oldType) return;

    form.accountId = "";
    form.fromAccountId = "";
    form.toAccountId = "";
    form.categoryId = "";
    form.goalId = "";

    if (newType === "expense" || newType === "income")
      form.accountId = mainAccount.value?.id || "";

    if (newType === "transfer") form.label = "Virement interne";
  },
);

const handleSubmit = async () => {
  try {
    const result = await createTransaction(form);

    if (result) {
      showToast("Transaction créée avec succès");
      resetForm();
      await Promise.all([fetchTransactions(), fetchAccounts()]);
    }
  } catch (err: unknown) {
    if (err instanceof Error) showToast(err.message, "error");
    else showToast("Une erreur inconnue est survenue", "error");
  }
};
</script>

<template>
  <form
    class="flex flex-col items-center px-5 py-7 w-7/8 h-fit gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3"
    @submit.prevent="handleSubmit"
  >
    <h1 class="mb-5 text-3xl font-semibold">Nouvelle Transaction</h1>

    <div class="flex flex-col gap-5 w-full">
      <BaseTransactionFields :modelValue="form" />
      <StandardTransactionFields
        :modelValue="form"
        v-if="form.type === 'expense' || form.type === 'income'"
      />
      <TransferFields :modelValue="form" v-else-if="form.type === 'transfer'" />
      <ContributionFields
        :modelValue="form"
        v-else-if="form.type === 'contribution'"
      />
    </div>
    <button
      type="submit"
      :disabled="loading || !form.type"
      :class="[
        'h-12 w-full rounded-xl text-base font-semibold transition-all duration-200',
        loading || !form.type
          ? 'cursor-not-allowed bg-slate-200 text-slate-400'
          : 'bg-[#1f2d5c] text-white hover:opacity-90',
      ]"
    >
      {{ loading ? "Chargement" : "Ajouter" }}
    </button>
  </form>
</template>
