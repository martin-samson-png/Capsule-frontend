import type {
  TransactionForm,
  Transaction,
  TransactionFilters,
  TransactionsResponse,
} from "~/types/transactions";
import { useAuth } from "../useAuth";
import { formatPayload } from "~/utils/formHelpers";

const validateForm = (form: TransactionForm) => {
  if (!form.type) return "Type obligatoire";

  if (!form.amount || form.amount <= 0) return "Montant invalide";

  if (
    ["expense", "income", "contribution"].includes(form.type) &&
    !form.accountId
  )
    return "Compte obligatoire";

  if (form.type === "transfer") {
    if (!form.fromAccountId || !form.toAccountId) return "Compte obligatoire";
    if (form.fromAccountId === form.toAccountId)
      return "Le compte source et destination doivent être différents";
  }

  if (form.type === "contribution" && !form.goalId)
    return "Objectif obligatoire";

  return null;
};

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

  const transactions = useState<Transaction[]>("transactions", () => []);
  const error = useState<string | null>("transaction-error", () => null);
  const hasMore = ref(false);
  const loading = ref(false);

  const resetFilters = () => {
    filters.value = {
      from: "",
      to: "",
      type: "",
      sortOrder: "",
      accountId: "",
    };
  };

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
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchTransactionsById = async (id: string) => {
    loading.value = false;
    error.value = null;

    try {
      const accessToken = await getAccessToken();

      const res = await $fetch<Transaction>(`api/transaction/${id}`, {
        method: "GET",
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res;
    } catch (err) {
      error.value = getErrorMessage(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createTransaction = async (form: TransactionForm) => {
    error.value = null;

    const validationError = validateForm(form);
    if (validationError) {
      error.value = validationError;
      throw validationError;
    }
    loading.value = true;

    const payload = {
      ...form,
      label: form.label ?? null,
      accountId:
        form.type === "expense" ||
        form.type === "income" ||
        form.type === "contribution"
          ? form.accountId
          : undefined,
      fromAccountId: form.type === "transfer" ? form.fromAccountId : undefined,
      toAccountId: form.type === "transfer" ? form.toAccountId : undefined,
      categoryId:
        form.type === "contribution" ? undefined : form.categoryId || undefined,
      goalId: form.type === "contribution" ? form.goalId : undefined,
    };

    try {
      const accessToken = await getAccessToken();

      const res = await $fetch("/api/transaction/create", {
        method: "POST",
        body: payload,
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res;
    } catch (err) {
      error.value = getErrorMessage(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateTransaction = async (
    id: string,
    form: Partial<TransactionForm>,
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = await getAccessToken();

      const payload = formatPayload(form);

      await $fetch(`/api/transaction/${id}`, {
        method: "PATCH",
        baseURL: config.public.backendUrl,
        body: payload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return true;
    } catch (err) {
      error.value = getErrorMessage(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteTransaction = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const accessToken = await getAccessToken();

      await $fetch(`/api/transaction/${id}`, {
        method: "DELETE",
        baseURL: config.public.backendUrl,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return true;
    } catch (err) {
      error.value = getErrorMessage(err);
      throw err;
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
    resetFilters,
    fetchTransactionsById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
