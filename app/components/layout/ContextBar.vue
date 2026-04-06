<script setup lang="ts">
import type { Component } from "vue";
import TransactionsFilter from "../ui/transactions/TransactionsFilter.vue";

defineProps<{ context: { title: string; icon: Component } }>();
</script>
<template>
  <header
    class="bg-[#fbfdff] h-14 md:h-18 px-5 flex items-center justify-between"
  >
    <div class="h-fit flex items-center gap-3 md:gap-5">
      <component :is="context.icon" :size="30" />
      <h2 class="text-xl md:text-3xl font-semibold">{{ context.title }}</h2>
    </div>
    <div class="md:w-1/6 h-full flex justify-end items-center">
      <TransactionsFilter />
    </div>
  </header>
</template>
