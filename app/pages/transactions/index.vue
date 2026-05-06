<script setup lang="ts">
import TransactionList from "~/components/ui/transactions/TransactionList.vue";
import TransactionsFormModal from "~/components/ui/transactions/TransactionsFormModal.vue";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";
import { useToast } from "~/composable/useToast";

const { filters, transactions, hasMore, loading, error, fetchTransactions } =
  useTransactions();

const { showToast } = useToast();

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
  <div class="space-y-6 pt-10">
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center min-h-[200px] w-full"
    >
      <div
        class="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
      ></div>
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
      v-if="isModalOpen"
      class="fixed inset-0 z-70 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <TransactionsFormModal :transaction-id="selectedId" @close="closeModal" />
    </div>
    <button v-if="hasMore" class="mt-4" @click="fetchTransactions">
      Charger plus
    </button>
  </div>
</template>
