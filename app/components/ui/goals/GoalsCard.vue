<script setup lang="ts">
import type { Goal } from "~/types/goals";
import { getGoalIcon } from "~/constant/goals";
import { useGoals } from "~/composable/goals/useGoals";
import BaseButton from "../BaseButton.vue";

defineProps<{ goal: Goal }>();

defineEmits(["contribute"]);

const { getProgress, getRemaining, getTargetLabel } = useGoals();
</script>

<template>
  <div
    class="relative overflow-hidden bg-white rounded-[24px] p-4 sm:p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
  >
    <div
      class="absolute -top-12 -right-12 w-32 h-32 bg-red-50/50 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10">
      <div class="flex justify-between items-start mb-4 sm:mb-6">
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
        <div v-if="goal.deadline" class="hidden sm:flex flex-col items-end">
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
        class="relative h-2.5 sm:h-4 w-full bg-slate-100 rounded-full mb-2 overflow-hidden"
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
        class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400 pb-5"
      >
        <span>
          {{ getProgress(goal) }} %
          <span class="hidden sm:inline">complété</span>
        </span>
        <span
          :class="getProgress(goal) >= 100 ? 'text-green-500' : 'text-blue-600'"
        >
          {{ getRemaining(goal) }} restants</span
        >
      </div>

      <BaseButton
        v-if="goal.status !== 'completed'"
        @click="$emit('contribute', goal)"
      >
        <IconPlus :size="20" />
        Contribuer
      </BaseButton>
    </div>
  </div>
</template>
