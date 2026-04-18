<script setup lang="ts">
import { useAccounts } from "~/composable/accounts/useAccounts";
import { useCategories } from "~/composable/categories/useCategories";

const { accounts } = useAccounts();
</script>
<template>{{ accounts }}</template>
