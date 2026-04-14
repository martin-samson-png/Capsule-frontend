import { useAccounts } from "~/composable/accounts/useAccounts";
import { useCategories } from "~/composable/categories/useCategories";
import { useGoals } from "~/composable/goals/useGoals";
import { useProfile } from "~/composable/useProfile";

export default defineNuxtPlugin(() => {
  const client = useSupabaseClient();

  const { fetchProfile, clearProfile } = useProfile();
  const { fetchCategories } = useCategories();
  const { fetchGoals } = useGoals();
  const { fetchAccounts } = useAccounts();

  const loadingUserData = useState<boolean>("loading-user-data", () => true);
  const globalError = useState<string | null>("global-error", () => null);

  client.auth.onAuthStateChange(async (event, session) => {
    console.log("EVENT AUTH DETECTÉ :", event);
    if (session?.user) {
      try {
        loadingUserData.value = true;
        globalError.value = null;
        const token = session.access_token;

        await Promise.all([
          fetchProfile(token),
          fetchAccounts(token),
          fetchCategories(token),
          fetchGoals(token),
        ]);
      } catch (err) {
        globalError.value = getErrorMessage(err);
      } finally {
        loadingUserData.value = false;
      }
    } else {
      clearProfile();
      loadingUserData.value = false;
    }
  });
});
