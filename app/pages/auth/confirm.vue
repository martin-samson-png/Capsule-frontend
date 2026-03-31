<script setup lang="ts">
import { useProfile } from "~/composable/useProfile";

definePageMeta({ layout: "auth" });

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const redirectInfo = useSupabaseCookieRedirect();

const { fetchProfile, clearProfile } = useProfile();

const backendError = ref("");
const loading = ref(true);

watch(
  user,
  async () => {
    if (!user.value) return;

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        backendError.value = error.message;
        return;
      }

      const accessToken = data.session?.access_token;
      if (!accessToken) {
        clearProfile();
        await navigateTo("/auth/login");
        return;
      }

      await fetchProfile(accessToken);

      const path = redirectInfo.pluck();
      await navigateTo(path || "/dashboard");
    } catch (err) {
      backendError.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="space-y-3">
    <p v-if="loading && !backendError">Confirmation en cours...</p>
    <p v-else-if="backendError" class="text-sm text-red-600">
      {{ backendError }}
    </p>
  </div>
</template>
