import type { GoalResponse, Goal } from "~/types/goals";
import { useAuth } from "../useAuth";

export const useGoals = () => {
  const { getAccessToken } = useAuth();
  const config = useRuntimeConfig();

  const goals = useState<Goal[]>("goals", () => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchGoals = async (providedToken?: string) => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = providedToken || (await getAccessToken());

      const res = await $fetch<GoalResponse>("/api/goal", {
        method: "GET",
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      goals.value = res.data;
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  return { goals, loading, error, fetchGoals };
};
