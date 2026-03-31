<script setup lang="ts">
const props = defineProps<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-4">
    <label class="px-1 font-medium" :for="id">{{ label }}</label>
    <input
      class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[#1f2d5c] placeholder:text-slate-400 outline-none transition focus:border-[#1f2d5c]/30 focus:ring-4 focus:ring-[#1f2d5c]/10"
      :type="type ?? 'text'"
      :id="id"
      :placeholder="placeholder ?? ''"
      v-model="model"
    />
  </div>
</template>
