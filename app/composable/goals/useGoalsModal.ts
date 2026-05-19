export const useGoalModal = () => {
  const isGoalModalOpen = useState<boolean>("goal-create-modal", () => false);

  const selectedId = useState<string | null>("goal-selected-id", () => null);

  const toggleModal = () => {
    isGoalModalOpen.value = !isGoalModalOpen.value;
  };

  const openGoalModal = (id?: string) => {
    selectedId.value = id || null;
    isGoalModalOpen.value = true;
  };

  const closeGoalModal = () => {
    isGoalModalOpen.value = false;
    selectedId.value = null;
  };

  return {
    isGoalModalOpen,
    selectedId,
    toggleModal,
    openGoalModal,
    closeGoalModal,
  };
};
