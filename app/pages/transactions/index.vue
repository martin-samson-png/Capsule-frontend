<script setup lang="ts">
import TransactionList from "~/components/ui/transactions/TransactionList.vue";
import { useTransactions } from "~/composable/useTransaction";

const { filters, transactions, hasMore, loading, error, fetchTransactions } =
  useTransactions();

onMounted(() => fetchTransactions());

watch(
  filters,
  () => {
    fetchTransactions();
  },
  { deep: true },
);
</script>
<template>
  <div class="space-y-6 pt-10">
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div
        class="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1f2d5c]"
      ></div>
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else-if="transactions.length === 0">Aucune transaction trouvée.</div>
    <div v-else>
      <TransactionList :transactions="transactions" />
    </div>
    <button v-if="hasMore" class="mt-4" @click="fetchTransactions">
      Charger plus
    </button>
  </div>
</template>
