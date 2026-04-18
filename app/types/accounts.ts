export interface Account {
  id: string;
  type: "main" | "savings";
  balanceCents: number;
}
