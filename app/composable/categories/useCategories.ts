import type { CategoriesResponse, Category } from "~/types/categories";
import { useAuth } from "../useAuth";

export const useCategories = () => {
  const { getAccessToken } = useAuth();
  const config = useRuntimeConfig();

  const categories = useState<Category[]>("categories", () => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCategories = async (providedToken?: string) => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = providedToken || (await getAccessToken());

      const res = await $fetch<CategoriesResponse>("/api/category", {
        method: "GET",
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      categories.value = res.data;
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  return { categories, loading, error, fetchCategories };
};
