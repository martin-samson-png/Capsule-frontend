<script setup lang="ts">
import { useAuth } from "~/composable/useAuth";
import { useProfile } from "~/composable/useProfile";

definePageMeta({ layout: "auth" });

const user = useSupabaseUser();
const redirectInfo = useSupabaseCookieRedirect();

const { fetchProfile, clearProfile } = useProfile();
const { getAccessToken } = useAuth();

const backendError = ref("");
const loading = ref(true);

watch(
  user,
  async () => {
    if (!user.value) return;

    try {
      const accessToken = await getAccessToken();
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
