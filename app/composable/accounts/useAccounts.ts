import type { Account } from "~/types/accounts";
import { useAuth } from "../useAuth";

export const useAccounts = () => {
  const { getAccessToken } = useAuth();
  const config = useRuntimeConfig();

  const accounts = useState<Account[]>("accounts", () => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAccounts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = await getAccessToken();

      const res = await $fetch<Account[]>("api/profile/accounts", {
        method: "GET",
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      accounts.value = res;
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  return { accounts, loading, error, fetchAccounts };
};
