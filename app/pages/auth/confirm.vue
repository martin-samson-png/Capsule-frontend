<script setup lang="ts">
definePageMeta({ layout: "auth" });

const user = useSupabaseUser();
const redirectInfo = useSupabaseCookieRedirect();

const loadingUserData = useState<boolean>("loading-user-data");

watch(
  [user, loadingUserData],
  async ([newUser, isLoading]) => {
    if (!user.value) return;

    if (newUser && isLoading === false) {
      const path = redirectInfo.pluck();
      await navigateTo(path || "/dashboard");
    }
  },
  { immediate: true },
);
</script>

<template>
  <p>Connexion en cours…</p>
  <p v-if="loadingUserData">Récupération de vos données</p>
</template>
