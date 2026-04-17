<script setup lang="ts">
import type { OptionProps } from "~/types/forms";

defineProps<{
  id: string;
  label: string;
  options: OptionProps[];
}>();

const model = defineModel<string | null>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="sortOrder" class="text-sm font-medium text-[#1f2d5c]">{{
      label
    }}</label>
    <div class="relative">
      <select
        :id="id"
        :name="id"
        v-model="model"
        class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-[#1f2d5c] shadow-sm outline-none transition focus:border-[#1f2d5c]/30 focus:ring-4 focus:ring-[#1f2d5c]/10"
      >
        <option disabled value="">Sélectionner...</option>
        <option
          :value="option.value"
          :key="option.value"
          v-for="option in options"
        >
          {{ option.label }}
        </option>
      </select>
      <svg
        class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1f2d5c]/50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
</template>
