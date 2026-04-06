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

export type TransactionFilters = {
  from: string;
  to: string;
  type: "expense" | "income" | "transfer" | "contribution" | "";
  sortOrder: "asc" | "desc" | "";
  accountId: string;
};
