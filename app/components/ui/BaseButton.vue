<script setup lang="ts">
interface Props {
  variant?: "primary" | "danger" | "secondary";
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button",
  loading: false,
});

const variants = {
  primary: "bg-[#1f2d5c] text-white hover:opacity-90 active:scale-[0.98]",
  danger: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'min-h-12 w-full rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2',
      disabled || loading
        ? 'cursor-not-allowed bg-slate-200 text-slate-400'
        : variants[variant],
    ]"
  >
    <template v-if="loading"
      ><span class="animate-pulse">Chargement...</span></template
    >
    <template v-else>
      <slot />
    </template>
  </button>
</template>
