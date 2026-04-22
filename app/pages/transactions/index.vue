<script setup lang="ts">
import TransactionsFormModal from "~/components/ui/form/transaction/TransactionsFormModal.vue";
import TransactionList from "~/components/ui/transactions/TransactionList.vue";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";

const { filters, transactions, hasMore, loading, error, fetchTransactions } =
  useTransactions();

const { isModalOpen, selectedId, openModal, closeModal } =
  useTransactionModal();

onMounted(() => {
  fetchTransactions();
});
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
      <TransactionList
        :transactions="transactions"
        @select-transaction="openModal"
      />
    </div>
    <div
      @click.self="closeModal"
      v-show="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <TransactionsFormModal :transaction-id="selectedId" @close="closeModal" />
    </div>
    <button v-if="hasMore" class="mt-4" @click="fetchTransactions">
      Charger plus
    </button>
  </div>
</template>
