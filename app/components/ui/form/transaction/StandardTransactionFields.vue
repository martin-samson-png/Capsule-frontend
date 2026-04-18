<script setup lang="ts">
import type { CreateTransaction } from "~/types/transactions";
import { useCategories } from "~/composable/categories/useCategories";
import type { OptionProps } from "~/types/forms";
import BaseSelect from "../../BaseSelect.vue";

defineProps<{ modelValue: CreateTransaction }>();

const { categories } = useCategories();
const selectCategory = computed<OptionProps[]>(() =>
  categories.value.map((c) => ({ label: c.label, value: c.id })),
);
</script>

<template>
  <BaseSelect
    :key="`cat-${selectCategory.length}`"
    id="category"
    label="Catégorie"
    :options="selectCategory"
    v-model="modelValue.categoryId"
  />
</template>
