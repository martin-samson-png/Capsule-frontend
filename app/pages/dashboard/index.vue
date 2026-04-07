<script setup lang="ts">
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useCategories } from "~/composable/categories/useCategories";

const { categories } = useCategories();
const { accounts } = useAccounts();

const bonjour = accounts.value.filter((v) => v.type === "main");
</script>
<template>{{ bonjour }}</template>
