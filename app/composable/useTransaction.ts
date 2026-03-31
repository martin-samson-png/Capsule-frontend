import type { TransactionFilters } from "~/types/transactions";

export interface Transaction {
  id: string;
  date: string;
  amount_cents: number;
  label: string;
  created_at: string;
  type: "expense" | "income" | "transfer" | "contribution";
}

export interface TransactionsResponse {
  data: Transaction[];
  hasMore: boolean;
}

export const useTransactions = () => {
  const config = useRuntimeConfig();
  const supabase = useSupabaseClient();

  const filters = useState<TransactionFilters>("transactions-filter", () => ({
    from: "",
    to: "",
    type: "",
    sortOrder: "desc",
  }));

  const transactions = ref<Transaction[]>([]);
  const hasMore = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Utilisateur non authentifié");
      }
      const res = await $fetch<TransactionsResponse>(
        "/api/transaction/eedef3d3-b686-461b-bd55-138cf6f61935",
        {
          baseURL: config.public.backendUrl,
          query: {
            from: filters.value.from || undefined,
            to: filters.value.to || undefined,
            type: filters.value.type || undefined,
            sortOrder: filters.value.sortOrder || undefined,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      transactions.value = res.data;
      hasMore.value = res.hasMore;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    filters,
    transactions,
    loading,
    error,
    hasMore,
    fetchTransactions,
  };
};
