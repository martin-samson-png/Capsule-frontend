<script setup lang="ts">
import type { TransactionForm } from "~/types/transactions";
import TransferFields from "./TransferFields.vue";
import ContributionFields from "./ContributionFields.vue";
import StandardTransactionFields from "./StandardTransactionFields.vue";
import BaseTransactionFields from "./BaseTransactionFields.vue";
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useTransactions } from "~/composable/transactions/useTransaction";
import { useToast } from "~/composable/useToast";
import { getDirtyValues } from "../../../../utils/formHelpers";

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

const getInitialForm = (): TransactionForm => ({
  type: "",
  date: formatDateForInput(new Date()),
  amount: null,
  label: "",
  accountId: "",
  fromAccountId: "",
  toAccountId: "",
  categoryId: "",
  goalId: "",
});

const props = defineProps<{ transactionId?: string | null }>();

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
        showToast("Aucun champs a modifié", "warning");
        emit("close");
        return;
      }

      result = await updateTransaction(props.transactionId, dirtyValue);
    } else {
      result = await createTransaction(form);
    }

    if (result) {
      showToast(
        props.transactionId
          ? "Transaction modifiée avec succès"
          : "Transaction créée avec succès",
      );
      emit("close");
      resetForm();
      await Promise.all([fetchTransactions(), fetchAccounts()]);
    }
  } catch (err: unknown) {
    if (err instanceof Error) showToast(err.message, "error");
    else showToast("Une erreur inconnue est survenue", "error");
  }
};

const handleDelete = async () => {
  try {
    if (!props.transactionId) {
      showToast("jsp");
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
      <BaseTransactionFields :modelValue="form" :isEditing="!!transactionId" />
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
    <button
      type="submit"
      :disabled="loading || !form.type"
      :class="[
        'h-12 w-full rounded-xl text-base font-semibold transition-all duration-200 min-h-12',
        loading || !form.type
          ? 'cursor-not-allowed bg-slate-200 text-slate-400'
          : 'bg-[#1f2d5c] text-white hover:opacity-90',
      ]"
    >
      {{
        loading
          ? "Chargement"
          : transactionId
            ? "Enregistrer le modification"
            : "Créer"
      }}
    </button>
  </form>
</template>
