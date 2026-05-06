<script setup lang="ts">
import type { TransactionForm } from "~/types/transactions";
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useToast } from "~/composable/useToast";
import BaseTransactionFields from "../form/transaction/BaseTransactionFields.vue";
import StandardTransactionFields from "../form/transaction/StandardTransactionFields.vue";
import TransferFields from "../form/transaction/TransferFields.vue";
import ContributionFields from "../form/transaction/ContributionFields.vue";
import BaseButton from "../BaseButton.vue";
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";

const { mainAccount, fetchAccounts } = useAccounts();
const {
  createTransaction,
  fetchTransactions,
  fetchTransactionsById,
  updateTransaction,
  deleteTransaction,
  loading,
} = useTransactions();
const { showToast } = useToast();

const { forcedTransactionType, targetGoalId, forcedLabel } =
  useTransactionModal();

const props = defineProps<{
  transactionId?: string | null;
}>();

const getInitialForm = (): TransactionForm => ({
  type: forcedTransactionType.value || "",
  date: formatDateForInput(new Date()),
  amount: null,
  label: forcedLabel.value || "",
  accountId: "",
  fromAccountId: "",
  toAccountId: "",
  categoryId: "",
  goalId: targetGoalId.value || "",
});

const emit = defineEmits(["close"]);

const form = reactive<TransactionForm>(getInitialForm());

const originalData = ref<TransactionForm | null>(null);

const resetForm = () => {
  Object.assign(form, getInitialForm());
};

watch(
  () => form.type,
  (newType, oldType) => {
    if (!oldType && !props.transactionId) {
      form.accountId = "";
      form.fromAccountId = "";
      form.toAccountId = "";
      form.categoryId = "";
      form.goalId = "";
    }

    if (newType === "expense" || newType === "income")
      form.accountId = mainAccount.value?.id || "";

    if (newType === "transfer") form.label = "Virement interne";
  },
);

watch(
  () => props.transactionId,
  async (newId) => {
    if (newId) {
      const data = await fetchTransactionsById(newId);

      if (!data) return;

      const formattedData = {
        ...data,
        date: formatDateForInput(data.date),
        amount: data.amountCents / 100,
      };

      Object.assign(form, formattedData);

      originalData.value = structuredClone(formattedData);
    } else {
      resetForm();
      originalData.value = null;
    }
  },
  { immediate: true },
);

const handleSubmit = async () => {
  try {
    let result;
    if (props.transactionId && originalData.value) {
      const dirtyValue = getDirtyValues(originalData.value, form);

      if (Object.keys(dirtyValue).length === 0) {
        showToast("Aucun champ à modifier", "warning");
        emit("close");
        return;
      }

      result = await updateTransaction(props.transactionId, dirtyValue);
    } else {
      result = await createTransaction(form);
    }

    if (result) {
      let successMessage = "Transaction créée avec succès";

      if (props.transactionId) {
        successMessage = "Transaction modifiée avec succès";
      } else if (targetGoalId.value) {
        successMessage = "Contribution créée avec succès";
      }
      showToast(successMessage);
      emit("close");
      resetForm();
      await Promise.all([fetchTransactions(), fetchAccounts()]);
    }
  } catch (err) {
    // Erreur gérée par le watch global dans index.vue
    // On catch uniquement pour stopper l'exécution de handleSubmit}
  }
};

const handleDelete = async () => {
  try {
    if (!props.transactionId) {
      showToast("Selectinner une transaction", "error");
      return;
    }
    await deleteTransaction(props.transactionId);
    showToast("Transaction supprimée avec succès");
    resetForm();
    await Promise.all([fetchTransactions(), fetchAccounts()]);
    emit("close");
  } catch (err: unknown) {
    if (err instanceof Error) showToast(err.message, "error");
    else showToast("Une erreur inconnue est survenue", "error");
  }
};
</script>

<template>
  <form
    class="flex flex-col items-center px-5 py-7 w-7/8 gap-5 bg-[#fbfdff] rounded-lg shadow-lg sm:w-2/3 md:w-3/5 lg:w-2/5 xl:w-1/3 max-h-[90vh] overflow-y-auto"
    @submit.prevent="handleSubmit"
  >
    <h1 class="mb-5 text-3xl font-semibold">
      {{ transactionId ? "Modifier la transaction" : "Nouvelle Transaction" }}
    </h1>

    <div class="flex flex-col gap-5 w-full">
      <BaseTransactionFields
        :modelValue="form"
        :isEditing="!!transactionId || !!forcedTransactionType"
      />
      <StandardTransactionFields
        :modelValue="form"
        v-if="form.type === 'expense' || form.type === 'income'"
      />
      <TransferFields
        :modelValue="form"
        v-else-if="form.type === 'transfer'"
        :isEditing="!!transactionId"
      />
      <ContributionFields
        :modelValue="form"
        v-else-if="form.type === 'contribution'"
        :isEditing="!!transactionId"
      />
    </div>
    <BaseButton type="submit" :loading="loading" :disabled="!form.type">{{
      transactionId ? "Enregister les modifications" : "Créer"
    }}</BaseButton>
    <BaseButton
      v-if="transactionId"
      :loading="loading"
      variant="danger"
      @click="handleDelete"
      >Supprimer la transaction</BaseButton
    >
  </form>
</template>
