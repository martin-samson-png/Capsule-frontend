<script setup lang="ts">
import type { LoginFormInterface } from "~/types/forms";
import BaseInput from "../BaseInput.vue";

const props = defineProps<{ modelValue: LoginFormInterface }>();

const emit = defineEmits(["update:modelValue"]);

const model = computed<LoginFormInterface>({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <BaseInput
      id="email"
      label="Email"
      placeholder="jhondoe@exemple.com"
      v-model="model.email"
    />
    <BaseInput
      id="password"
      label="Mot de passe"
      type="password"
      v-model="model.password"
    />
  </div>
</template>
