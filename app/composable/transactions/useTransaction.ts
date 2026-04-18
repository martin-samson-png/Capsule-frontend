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

  const transactions = useState<Transaction[]>("transactions", () => []);
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
      const msg = getErrorMessage(err);
      error.value = msg;
      throw msg;
    } finally {
      loading.value = false;
    }
  };

  const validateForm = (form: CreateTransaction) => {
    if (!form.type) throw new Error("Type obligatoire");

    if (!form.amount || form.amount <= 0) throw new Error("Montant invalide");

    if (!form.label) throw new Error("Libellé obligatoire");

    if (
      ["expense", "income", "contribution"].includes(form.type) &&
      !form.accountId
    )
      throw new Error("Compte obligatoire");

    if (form.type === "transfer") {
      if (!form.fromAccountId || !form.toAccountId)
        throw new Error("Compte obligatoire");
      if (form.fromAccountId === form.toAccountId)
        throw new Error(
          "Le compte source et destination doivent être différents",
        );
    }

    if (form.type === "contribution" && !form.goalId)
      throw new Error("Objectif obligatoire");

    return null;
  };

  const createTransaction = async (form: CreateTransaction) => {
    error.value = null;

    const validationError = validateForm(form);
    if (validationError) {
      error.value = validationError;

      throw new Error(validationError);
    }
    loading.value = true;

    const payload = {
      ...form,
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
      const msg = getErrorMessage(err);
      error.value = msg;
      throw msg;
    } finally {
      loading.value = false;
    }
  };

  const updateTransaction = async (id: string, form: CreateTransaction) => {};

  const deleteTransaction = async (id: string) => {};

  return {
    filters,
    transactions,
    loading,
    error,
    hasMore,
    fetchTransactions,
    fetchTransactionsById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
