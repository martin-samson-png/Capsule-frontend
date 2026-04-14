<script setup lang="ts">
import LoginForm from "~/components/ui/form/LoginForm.vue";
import { useAuth } from "~/composable/useAuth";
import type { LoginFormInterface } from "~/types/forms";

definePageMeta({ layout: "auth" });

const { login } = useAuth();
const backendError = ref("");

const submit = async (input: LoginFormInterface) => {
  try {
    const { error } = await login(input);

    if (error) {
      backendError.value = error.message;
      return;
    }

    navigateTo("/auth/confirm");
  } catch (err) {
    backendError.value = getErrorMessage(err);
  }
};
</script>

<template>
  <LoginForm :backendError="backendError" @submit="submit" />
</template>
