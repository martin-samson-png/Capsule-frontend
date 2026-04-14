<script setup lang="ts">
import type { CreateTransaction } from "~/types/transactions";
import TransferFields from "./TransferFields.vue";
import ContributionFields from "./ContributionFields.vue";
import StandardTransactionFields from "./StandardTransactionFields.vue";
import BaseTransactionFields from "./BaseTransactionFields.vue";

const form = reactive<CreateTransaction>({
  type: "",
  date: "",
  amount: null,
  label: "",
  accountId: "",
  fromAccountId: "",
  toAccountId: "",
  categoryId: "",
  goalId: "",
});

const loading = ref(false);
const error = ref<string | null>(null);
</script>

<template>
  <form
    class="flex flex-col items-center px-5 py-7 w-7/8 h-fit gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3"
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
      Se connecter
    </button>
  </form>
</template>
