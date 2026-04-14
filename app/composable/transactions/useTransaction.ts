import type {
  CreateTransaction,
  Transaction,
  TransactionFilters,
  TransactionsResponse,
} from "~/types/transactions";
import { useAuth } from "../useAuth";

export const useTransactions = () => {
  const { getAccessToken } = useAuth();
  const config = useRuntimeConfig();

  const filters = useState<TransactionFilters>("transactions-filter", () => ({
    from: "",
    to: "",
    type: "",
    sortOrder: "",
    accountId: "",
  }));

  const transactions = ref<Transaction[]>([]);
  const hasMore = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = await getAccessToken();

      const res = await $fetch<TransactionsResponse>("/api/transaction/", {
        method: "GET",
        baseURL: config.public.backendUrl,
        query: {
          from: filters.value.from || undefined,
          to: filters.value.to || undefined,
          type: filters.value.type || undefined,
          sortOrder: filters.value.sortOrder || undefined,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      transactions.value = res.data;
      hasMore.value = res.hasMore;
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  };

  const createTransaction = async (data: CreateTransaction) => {};

  return {
    filters,
    transactions,
    loading,
    error,
    hasMore,
    fetchTransactions,
  };
};
