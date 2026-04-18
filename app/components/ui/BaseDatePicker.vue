<script setup lang="ts">
defineProps<{
  id: string;
  label?: string;
}>();

const model = defineModel<string | undefined>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id" class="text-sm font-medium">{{
      label
    }}</label>
    <input
      :id="id"
      type="date"
      :name="id"
      class="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#1f2d5c] outline-none transition focus:border-[#1f2d5c]/30 focus:ring-4 focus:ring-[#1f2d5c]/10"
      v-model="model"
    />
  </div>
</template>
