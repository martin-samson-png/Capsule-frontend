<script setup lang="ts">
import { useTransactionModal } from "~/composable/transactions/useTransactionModal";
import BaseButton from "../BaseButton.vue";

const { toggleModal } = useTransactionModal();
</script>

<template>
  <BaseButton @click="toggleModal" class="max-w-40"
    ><IconCirclePlus :size="28" /><span class="hidden md:flex">Ajouter</span>
  </BaseButton>
</template>
