<script setup lang="ts">
import { ref } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "~/lib/ui/popover";
import type { OptionProps } from "~/types/forms";
import BaseSelect from "../BaseSelect.vue";
import BaseDatePicker from "../BaseDatePicker.vue";
import type { TransactionFilters } from "~/types/transactions";
import BaseButton from "../BaseButton.vue";

const filters = useState<TransactionFilters>("transactions-filter", () => ({
  from: "",
  to: "",
  type: "",
  sortOrder: "",
  accountId: "",
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

const selectAccount = ref<OptionProps[]>([
  { value: "main", label: "Compte principal" },
  { value: "savings", label: " Compte épargne" },
]);

const isFilterOpen = ref(false);

const resetFilter = () => {
  filters.value.from = "";
  filters.value.to = "";
  filters.value.type = "";
  filters.value.sortOrder = "";
  filters.value.accountId = "";
};
</script>

<template>
  <Popover :open="isFilterOpen" @update:open="isFilterOpen = $event">
    <PopoverTrigger as-child>
      <button
        type="button"
        :class="[
          'min-h-12 min-w-40 rounded-lg border-2 px-4 font-medium transition',
          isFilterOpen
            ? 'border-[#D6E1FF] bg-[#3E63DD] text-[#D6E1FF]'
            : 'border-[#1f2d5c] bg-[#fbfdff] text-[#1f2d5c]',
        ]"
      >
        {{ isFilterOpen ? "Fermer les filtres" : "Ouvrir les filtres" }}
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
          id="account"
          label="Compte"
          v-model="filters.accountId"
          :options="selectAccount"
        />
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
        <BaseButton @click="resetFilter">Reinitialiser</BaseButton>
      </div>
    </PopoverContent>
  </Popover>
</template>
