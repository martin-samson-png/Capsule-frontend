<script setup lang="ts">
import { getGoalIcon } from "~/constant/goals";
import { Popover, PopoverContent, PopoverTrigger } from "~/lib/ui/popover";

const model = defineModel<string>({ default: "Target" });

const props = defineProps<{
  id: string;
  label: string;
  icons: string[];
}>();

const isPickerOpen = ref(false);

const selectIcon = (iconName: string) => {
  model.value = iconName;
  isPickerOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label :for="id" class="text-sm font-medium text-[#1f2d5c]">
      {{ label }}
    </label>

    <Popover :open="isPickerOpen" @update:open="isPickerOpen = $event">
      <PopoverTrigger as-child>
        <button
          :id="id"
          type="button"
          class="flex items-center gap-3 px-4 h-12 w-full rounded-lg border-2 border-[#1f2d5c]/10 bg-[#fbfdff] hover:border-[#3E63DD] transition-all text-left"
        >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-md bg-[#3E63DD]/10 text-[#3E63DD]"
          >
            <component :is="getGoalIcon(model)" class="h-5 w-5" />
          </div>

          <span class="text-slate-600 text-sm">
            {{ model.replace(/([A-Z])/g, " $1").trim() }}
          </span>

          <span class="ml-auto text-slate-400 text-xs">▼</span>
        </button>
      </PopoverTrigger>

      <PopoverContent class="z-[100]">
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="iconName in icons"
            :key="iconName"
            type="button"
            @click="selectIcon(iconName)"
            :class="[
              'flex h-10 w-10 items-center justify-center rounded-lg transition-all',
              model === iconName
                ? 'bg-[#3E63DD] text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-[#3E63DD]/10 hover:text-[#3E63DD]',
            ]"
          >
            <component :is="getGoalIcon(iconName)" class="h-5 w-5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
