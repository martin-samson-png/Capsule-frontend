<script setup lang="ts">
import type { GoalForm } from "~/types/goals";
import BaseInput from "../../BaseInput.vue";
import BaseNumber from "../../BaseNumber.vue";
import BaseDatePicker from "../../BaseDatePicker.vue";
import BaseIconPicker from "../../BaseIconPicker.vue";
import { availableGoalIcon } from "~/constant/goals";

const props = defineProps<{ modelValue: GoalForm }>();

const emit = defineEmits(["update:modelValue"]);

const model = computed<GoalForm>({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

<template>
  <BaseInput
    id="label"
    label="Libellé"
    placeholder="Vacance"
    v-model="model.label"
  />
  <BaseNumber
    id="targetAmount"
    label="Montant cible"
    placeholder="0.00"
    :min="0"
    :step="0.01"
    v-model="model.targetAmount"
  />
  <BaseDatePicker id="deadline" label="Date limite" v-model="model.deadline" />
  <BaseIconPicker
    label="Icône"
    id="icon"
    :icons="availableGoalIcon"
    v-model="model.icon"
  />
</template>
