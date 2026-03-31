export type TransactionFilters = {
  from: string;
  to: string;
  type: "expense" | "income" | "transfer" | "contribution" | "";
  sortOrder: "asc" | "desc" | "";
};
