<script setup lang="ts">
import type { Transaction } from "~/types/transactions";

defineProps<{ transactions: Transaction[] }>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
    <ul class="divide-y divide-slate-100">
      <li
        v-for="tx in transactions"
        :key="tx.id"
        class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
      >
        <div class="flex flex-col">
          <span class="font-medium text-[#1f2d5c]">
            {{ tx.label }}
          </span>
          <span class="text-sm text-slate-400">
            {{ formatDateToDayMonthYear(tx.date) }}
          </span>
        </div>

        <div
          :class="[
            'font-semibold',
            tx.type === 'expense'
              ? 'text-red-500'
              : tx.type === 'income'
                ? 'text-green-500'
                : 'text-blue-500',
          ]"
        >
          {{ centsToEuro(tx.amount_cents) }}
        </div>
      </li>
    </ul>
  </div>
</template>
