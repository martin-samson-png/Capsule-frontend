type GoalStatus = "active" | "completed" | "archived";

export interface Goal {
  id: string;
  label: string;
  targetAmountCents: number;
  currentAmountCents: number;
  deadline: string;
  status: GoalStatus;
  icon: string;
  createdAt: string;
}

export interface GoalResponse {
  data: Goal[];
}
