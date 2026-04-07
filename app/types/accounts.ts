export interface Account {
  id: string;
  type: "main" | "savings";
  balance_cents: number;
}
