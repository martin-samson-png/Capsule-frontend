<script setup lang="ts">
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
  <div class="space-y-6">
    <div v-if="loading">Chargement...</div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="transactions.length === 0">Aucune transaction trouvée.</div>

    {{ transactions }}

    <button v-if="hasMore" class="mt-4" @click="fetchTransactions">
      Charger plus
    </button>
  </div>
</template>
