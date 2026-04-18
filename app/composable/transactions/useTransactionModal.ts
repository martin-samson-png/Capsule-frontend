export const useTransactionModal = () => {
  const isModalOpen = useState<boolean>(
    "transaction-create-modal",
    () => false,
  );

  const selectedId = useState<string | null>(
    "transaction-selected-id",
    () => null,
  );

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
  };

  return { isModalOpen, selectedId, toggleModal, openModal, closeModal };
};
