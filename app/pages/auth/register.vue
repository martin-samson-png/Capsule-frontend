<script setup lang="ts">
import RegisterForm from "~/components/ui/RegisterForm.vue";
import { useAuth } from "~/composable/useAuth";
import type { RegisterFormInterface } from "~/types/forms";

const { register } = useAuth();

const backendError = ref("");

const submit = async (data: RegisterFormInterface) => {
  try {
    const { error } = await register(data);
    if (error) {
      console.error(error.message);
      backendError.value = error.message;
      return;
    }
    navigateTo("/auth/login");
  } catch (err) {
    backendError.value = getErrorMessage(err);
  }
};
</script>

<template>
  <RegisterForm :backendError="backendError" @submit="submit" />
</template>
