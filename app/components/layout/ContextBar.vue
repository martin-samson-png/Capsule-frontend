<script setup lang="ts">
import type { Component } from "vue";
import TransactionsFilter from "../ui/transactions/TransactionsFilter.vue";
import AddTransactionButton from "../ui/transactions/AddTransactionButton.vue";
import type { FilterKey } from "~/constant/navigation";

const props = defineProps<{
  context: {
    title: string;
    icon: Component;
    filters: FilterKey | FilterKey[] | null;
  };
}>();

const showFilter = (k: FilterKey) => {
  if (!props.context.filters) return false;
  if (Array.isArray(props.context.filters))
    return props.context.filters.includes(k);
  return props.context.filters === k;
};
</script>
<template>
  <header
    class="bg-[#fbfdff] h-14 md:h-18 px-5 flex items-center justify-between"
  >
    <div class="h-fit flex items-center gap-3 md:gap-5">
      <component :is="context.icon" :size="30" />
      <h2 class="text-xl md:text-3xl font-semibold">{{ context.title }}</h2>
    </div>

    <div class="md:w-1/3 h-full gap-5 flex justify-end items-center">
      <AddTransactionButton v-if="showFilter('addTransactionButton')" />
      <TransactionsFilter v-if="showFilter('transactionFilter')" />
    </div>
  </header>
</template>
