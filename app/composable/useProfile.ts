export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string;
  created_at: string;
}

export const useProfile = () => {
  const profile = useState<Profile | null>("profile", () => null);

  const fetchProfile = async (accessToken: string) => {
    const config = useRuntimeConfig();
    if (!accessToken) {
      profile.value = null;
      return null;
    }
    try {
      const data = await $fetch<Profile>("/api/profile/me", {
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      profile.value = data;

      return data;
    } catch (err) {
      profile.value = null;
      throw err;
    }
  };

  const clearProfile = () => {
    profile.value = null;
  };

  return { profile, fetchProfile, clearProfile };
};
