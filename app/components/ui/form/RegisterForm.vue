<script setup lang="ts">
import RegisterFields from "./RegisterFields.vue";

defineProps<{ backendError?: unknown }>();
const emit = defineEmits(["submit"]);

let form = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});
const loading = ref(false);
const error = ref<string | null>(null);

const submit = () => {
  error.value = null;
  loading.value = true;

  const cleanData = {
    username: form.username.trim(),
    email: form.email.trim(),
    password: form.password.trim(),
    confirmPassword: form.confirmPassword.trim(),
  };

  error.value = validateEmail(cleanData.email);

  if (
    !cleanData.username ||
    !cleanData.email ||
    !cleanData.password ||
    !cleanData.confirmPassword
  ) {
    error.value = "Champs manquant";
    loading.value = false;
    return;
  }

  if (cleanData.password !== cleanData.confirmPassword) {
    error.value = "Mot de passe différent";
    loading.value = false;
    return;
  }

  emit("submit", cleanData);
  loading.value = false;
};
</script>

<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col items-center px-5 py-7 w-7/8 h-fit gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3"
  >
    <h1 class="mb-5 text-3xl font-semibold">Inscription</h1>
    <RegisterFields :modelValue="form" />
    <div class="flex gap-3 w-full">
      <input
        type="checkbox"
        id="terms"
        v-model="form.terms"
        :disabled="loading"
      /><label for="terms">Accepter les conditions d'utilisations</label>
    </div>
    <p
      v-if="error !== null || backendError !== null"
      class="text-red-500 w-full text-center"
    >
      {{ error || backendError }}
    </p>
    <button
      type="submit"
      :disabled="loading || !form.terms"
      :class="[
        'h-12 w-full rounded-xl text-base font-semibold transition-all duration-200',
        loading || !form.terms
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
</template>
