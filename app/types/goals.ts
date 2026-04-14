type GoalStatus = "active" | "completed" | "archived";

export interface Goal {
  id: string;
  label: string;
  target_amount_cents: number;
  current_amount_cents: number;
  deadline: string;
  status: GoalStatus;
  created_at: string;
}

export interface GoalResponse {
  data: Goal[];
}
