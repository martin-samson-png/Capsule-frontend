import type { Goal } from "~/types/goals";
import type { TransactionType } from "~/types/transactions";

export const useTransactionModal = () => {
  const isModalOpen = useState<boolean>(
    "transaction-create-modal",
    () => false,
  );

  const selectedId = useState<string | null>(
    "transaction-selected-id",
    () => null,
  );

  const forcedTransactionType = useState<TransactionType | null>(
    "forced-type",
    () => null,
  );

  const forcedLabel = useState<string | null>("forced-label", () => null);

  const targetGoalId = useState<string | null>("target-goal-id", () => null);

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const openModal = (id?: string) => {
    selectedId.value = id || null;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedId.value = null;
    forcedTransactionType.value = null;
    forcedLabel.value = null;
    targetGoalId.value = null;
  };

  const openForContribution = (goal: Goal) => {
    forcedTransactionType.value = "contribution";
    targetGoalId.value = goal.id;
    forcedLabel.value = `Contribution ${goal.label}`;
    isModalOpen.value = true;
  };

  return {
    isModalOpen,
    selectedId,
    forcedTransactionType,
    targetGoalId,
    forcedLabel,
    openForContribution,
    toggleModal,
    openModal,
    closeModal,
  };
};
