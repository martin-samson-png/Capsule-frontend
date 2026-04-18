import { useAuth } from "./useAuth";

export interface Profile {
  id: string;
  displayName: string;
  avatarUrl: string;
  createdAt: string;
}

export const useProfile = () => {
  const profile = useState<Profile | null>("profile", () => null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProfile = async (providedToken?: string) => {
    const { getAccessToken } = useAuth();
    const config = useRuntimeConfig();

    try {
      const accessToken = providedToken || (await getAccessToken());

      const res = await $fetch<Profile>("/api/profile/me", {
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      profile.value = res;
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  const clearProfile = () => {
    profile.value = null;
  };

  return { profile, fetchProfile, clearProfile };
};
