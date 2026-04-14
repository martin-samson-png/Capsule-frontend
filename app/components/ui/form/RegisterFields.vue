<script setup lang="ts">
import type { RegisterFormInterface } from "~/types/forms";
import BaseInput from "../BaseInput.vue";

const props = defineProps<{
  modelValue: RegisterFormInterface & { confirmPassword: string };
}>();

const emit = defineEmits(["update:modelValue"]);

const model = computed<RegisterFormInterface & { confirmPassword: string }>({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <BaseInput
      id="username"
      label="Nom d’utilisateur"
      placeholder="Choisissez un nom d’utilisateur"
      v-model="model.username"
    />
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
    <BaseInput
      id="confirmPassword"
      label="Confirmer le mot de passe"
      type="password"
      v-model="model.confirmPassword"
    />
  </div>
</template>
