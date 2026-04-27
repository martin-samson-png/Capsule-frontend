import type { GoalResponse, Goal } from "~/types/goals";
import { useAuth } from "../useAuth";

const calculateProgress = (current: number, target: number) => {
  if (!target || target <= 0) return 0;
  let percentage = (current / target) * 100;
  if (percentage > 100) percentage = 100;
  return Math.round(percentage);
};

export const useGoals = () => {
  const { getAccessToken } = useAuth();
  const config = useRuntimeConfig();

  const goals = useState<Goal[]>("goals", () => []);
  const loading = ref(false);
  const error = useState<string | null>("error-goal", () => null);

  const getProgress = (goal: Goal): number => {
    return calculateProgress(goal.currentAmountCents, goal.targetAmountCents);
  };

  const getRemaining = (goal: Goal): string => {
    const remainingCents = goal.targetAmountCents - goal.currentAmountCents;
    return centsToEuro(Math.max(0, remainingCents));
  };

  const getTargetLabel = (goal: Goal): string => {
    return centsToEuro(goal.targetAmountCents);
  };

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
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    goals,
    loading,
    error,
    fetchGoals,
    getProgress,
    getRemaining,
    getTargetLabel,
  };
};
