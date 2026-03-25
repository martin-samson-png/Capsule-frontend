<script setup lang="ts">
import LoginFields from "./LoginFields.vue";

defineProps<{ backendError?: string }>();
const emit = defineEmits(["submit"]);

const form = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const error = ref<string | null>(null);

const submit = () => {
  error.value = "";
  loading.value = true;

  const cleanData = {
    email: form.email.trim(),
    password: form.password.trim(),
  };

  if (!cleanData.email || !cleanData.password) {
    error.value = "Champs manquant";
    loading.value = false;
    return;
  }
  emit("submit", cleanData);
  loading.value = false;
};
</script>

<template>
  <div class="h-screen flex justify-center py-5">
    <form
      @submit.prevent="submit"
      class="flex flex-col items-center px-5 py-7 w-7/8 h-fit gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3"
    >
      <h1 class="mb-5 text-3xl font-semibold">Ravis de vous revoir</h1>
      <LoginFields :modelValue="form" />
      <p
        v-if="error !== null || backendError !== null"
        class="text-red-500 w-full text-center"
      >
        {{ error || backendError }}
      </p>
      <button
        type="submit"
        :disabled="loading"
        :class="[
          'h-12 w-full rounded-xl text-base font-semibold transition-all duration-200',
          loading
            ? 'cursor-not-allowed bg-slate-200 text-slate-400'
            : 'bg-[#1f2d5c] text-white hover:opacity-90',
        ]"
      >
        Créer mon compte
      </button>
      <p class="mt-2">
        Déjà inscrit ?
        <NuxtLink
          to="/auth/login"
          class="font-medium text-[#1f2d5c] hover:underline"
          >S'inscrire</NuxtLink
        >
      </p>
    </form>
  </div>
</template>
