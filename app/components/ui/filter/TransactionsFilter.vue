<script setup lang="ts">
import { ref } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "~/lib/ui/popover";
import type { OptionProps } from "~/types/forms";
import BaseSelect from "../BaseSelect.vue";
import BaseDatePicker from "../BaseDatePicker.vue";
import type { TransactionFilters } from "~/types/transactions";

const filters = useState<TransactionFilters>("transactions-filter", () => ({
  from: "",
  to: "",
  type: "",
  sortOrder: "",
}));

const selectType = ref<OptionProps[]>([
  { value: "expense", label: "Dépense" },
  { value: "income", label: "Revenu" },
  { value: "transfer", label: "Transfert" },
  { value: "contribution", label: "Contribution" },
]);

const selectSortOrder = ref<OptionProps[]>([
  { value: "desc", label: "Plus récent" },
  { value: "asc", label: "Plus ancien" },
]);
const isFilterOpen = ref(false);
</script>

<template>
  <Popover :open="isFilterOpen" @update:open="isFilterOpen = $event">
    <PopoverTrigger as-child>
      <button
        type="button"
        :class="[
          'h-11 min-w-38 rounded-lg border-2 px-4 font-medium transition',
          isFilterOpen
            ? 'border-[#D6E1FF] bg-[#3E63DD] text-[#D6E1FF]'
            : 'border-[#1f2d5c] bg-[#fbfdff] text-[#1f2d5c]',
        ]"
      >
        Ouvrir les filtres
      </button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="flex flex-col gap-4">
        <BaseDatePicker
          id="from"
          label="Date de début"
          v-model="filters.from"
        />
        <BaseDatePicker id="to" label="Date de fin" v-model="filters.to" />
        <BaseSelect
          id="type"
          label="Type"
          v-model="filters.type"
          :options="selectType"
        />
        <BaseSelect
          id="sortOrder"
          label="Trier par"
          v-model="filters.sortOrder"
          :options="selectSortOrder"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>
