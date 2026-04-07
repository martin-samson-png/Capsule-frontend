<script setup lang="ts">
import type { OptionProps } from "~/types/forms";
import type { CreateTransaction } from "~/types/transactions";
import BaseSelect from "../../BaseSelect.vue";
import BaseNumber from "../../BaseNumber.vue";
import BaseInput from "../../BaseInput.vue";
import BaseDatePicker from "../../BaseDatePicker.vue";

const props = defineProps<{ modelValue: CreateTransaction }>();

const emit = defineEmits(["update:modelValue"]);

const model = computed<CreateTransaction>({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

const selectType = ref<OptionProps[]>([
  { value: "expense", label: "Dépense" },
  { value: "income", label: "Revenu" },
  { value: "transfer", label: "Transfert" },
  { value: "contribution", label: "Contribution" },
]);
</script>

<template>
  <BaseSelect
    id="type"
    label="Type"
    v-model="model.type"
    :options="selectType"
  />
  <BaseNumber
    id="amount"
    label="Montant"
    placeholder="0.00"
    :min="0"
    :step="0.01"
    v-model="model.amount"
  />
  <BaseInput
    id="label"
    label="Libellé"
    placeholder="Courses"
    v-model="model.label"
  />
  <BaseDatePicker id="date" label="Date" v-model="model.date" />
</template>
