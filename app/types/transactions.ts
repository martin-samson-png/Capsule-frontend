type TransactionType = "expense" | "income" | "transfer" | "contribution";

export interface Transaction {
  id: string;
  date: string;
  amount_cents: number;
  label: string;
  created_at: string;
  type: TransactionType;
}

export interface TransactionsResponse {
  data: Transaction[];
  hasMore: boolean;
}

export type TransactionFilters = {
  from: string;
  to: string;
  type: TransactionType | "";
  sortOrder: "asc" | "desc" | "";
  accountId: string;
};

export interface CreateTransaction {
  type: TransactionType | "";
  date: string;
  amount: number | null;
  label: string;
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  goalId?: string;
}
