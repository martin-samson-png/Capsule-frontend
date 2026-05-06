export type TransactionType =
  | "expense"
  | "income"
  | "transfer"
  | "contribution";

export interface Transaction {
  id: string;
  date: string;
  amountCents: number;
  label: string;
  createdAt: string;
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

export interface TransactionForm {
  type: TransactionType | "";
  date?: string;
  amount: number | null;
  label: string;
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  goalId?: string;
}
