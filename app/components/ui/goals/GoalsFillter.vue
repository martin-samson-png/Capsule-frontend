<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "~/lib/ui/popover";
import BaseDatePicker from "../BaseDatePicker.vue";
import BaseSelect from "../BaseSelect.vue";
import BaseButton from "../BaseButton.vue";
import { useGoals } from "~/composable/goals/useGoals";
import type { OptionProps } from "~/types/forms";

const { resetFilters, filters } = useGoals();

const selectSortOrder = ref<OptionProps[]>([
  { value: "desc", label: "Plus récent" },
  { value: "asc", label: "Plus ancien" },
]);

const selectStatus = ref<OptionProps[]>([
  { value: "active", label: "En cours" },
  { value: "completed", label: "Terminé" },
  { value: "archived", label: "Archivé" },
]);

const isFilterOpen = ref(false);
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
          id="deadlineFrom"
          label="Limite du"
          v-model="filters.deadlineFrom"
        />
        <BaseDatePicker
          id="to"
          label="Limite au"
          v-model="filters.deadlineTo"
        />

        <BaseSelect
          id="status"
          label="Status"
          v-model="filters.status"
          :options="selectStatus"
        />
        <BaseSelect
          id="sortOrder"
          label="Trier par"
          v-model="filters.sortOrder"
          :options="selectSortOrder"
        />
        <BaseButton @click="resetFilters">Reinitialiser</BaseButton>
      </div>
    </PopoverContent>
  </Popover>
</template>
