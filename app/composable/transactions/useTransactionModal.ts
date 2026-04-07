export const useTransactionModal = () => {
  const isModalOpen = useState<boolean>(
    "transaction-create-modal",
    () => false,
  );

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return { isModalOpen, toggleModal, closeModal };
};
