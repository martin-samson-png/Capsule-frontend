<script setup lang="ts">
import { useCategories } from "~/composable/categories/useCategories";

const { categories } = useCategories();
</script>
<template>{{ categories }}</template>
