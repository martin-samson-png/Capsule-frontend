<script setup lang="ts">
import type { Goal } from "~/types/goals";
import { getGoalIcon } from "~/constant/goals";
import { useGoals } from "~/composable/goals/useGoals";

defineProps<{ goal: Goal }>();

const { getProgress, getRemaining, getTargetLabel } = useGoals();
</script>

<template>
  <div
    class="relative overflow-hidden bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
  >
    <div
      class="absolute -top-12 -right-12 w-32 h-32 bg-red-50/50 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <div class="flex justify-between items-start mb-6">
        <div
          class="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
        >
          <component :is="getGoalIcon(goal.icon)" class="w-6 h-6" />
        </div>
        <span>
          {{ goal.status === "active" ? "En cours" : "Terminé" }}
        </span>
      </div>

      <div class="mb-5 flex justify-between">
        <div>
          <h3 class="text-xl font-bold text-slate-900 tracking-tight">
            {{ goal.label }}
          </h3>
          <p class="text-sm text-slate-400 font-medium">
            Objectif : {{ getTargetLabel(goal) }}
          </p>
        </div>
        <div v-if="goal.deadline" class="flex flex-col items-end">
          <span
            class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
            >Échéance</span
          >
          <span
            class="text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100"
          >
            {{ formatDateToDayMonthYear(goal.deadline) }}
          </span>
        </div>
      </div>

      <div
        class="relative h-4 w-full bg-slate-100 rounded-full mb-2 overflow-hidden"
      >
        <div
          class="h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-1000 ease-out"
          :class="
            getProgress(goal) >= 100
              ? 'from-green-400 to-green-600'
              : 'from-blue-400 to-blue-600'
          "
          :style="{ width: `${Math.min(getProgress(goal), 100)}%` }"
        ></div>
      </div>

      <div
        class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400"
      >
        <span>{{ getProgress(goal) }} % complété</span>
        <span class="text-blue-600"> {{ getRemaining(goal) }} restants</span>
      </div>

      <button
        class="mt-6 w-full group flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-600 py-3.5 rounded-xl transition-all duration-200"
      >
        <IconPlus class="w-4 h-4 text-slate-600 group-hover:text-white" />
        <span class="text-sm font-bold text-slate-700 group-hover:text-white"
          >Contribuer</span
        >
      </button>
    </div>
  </div>
</template>
