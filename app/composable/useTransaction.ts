import type {
  Transaction,
  TransactionFilters,
  TransactionsResponse,
} from "~/types/transactions";
import { useAuth } from "./useAuth";

const { getAccessToken } = useAuth();

export const useTransactions = () => {
  const config = useRuntimeConfig();

  const filters = useState<TransactionFilters>("transactions-filter", () => ({
    from: "",
    to: "",
    type: "",
    sortOrder: "",
    accountId: "",
  }));

  const isModalOpen = useState<boolean>(
    "transaction-create-modal",
    () => false,
  );

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
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    filters,
    isModalOpen,
    transactions,
    loading,
    error,
    hasMore,
    fetchTransactions,
  };
};
