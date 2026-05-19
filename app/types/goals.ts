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
  hasMore: boolean;
}

export interface GoalFilter {
  label: string;
  status: "active" | "completed" | "archived" | "";
  deadlineFrom: string;
  deadlineTo: string;
  sortOrder: "asc" | "desc" | "";
}

export interface GoalForm {
  label: string;
  targetAmount: number | null;
  deadline?: string;
  icon: string;
}
