<script setup lang="ts">
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";

const { toggleModal } = useTransactionModal();
</script>

<template>
  <button @click="toggleModal">+ Ajouter</button>
</template>
