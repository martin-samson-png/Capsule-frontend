import {
  IconHome,
  IconChartPie,
  IconArrowLeftRight,
  IconGoal,
} from "#components";
import type { Component } from "vue";

type FilterKey = "chartsFilter" | "addTransactionButton" | "goalsFilter" | null;

type NavItem = {
  label: string;
  to: string;
  icon: Component;
  filter: FilterKey;
};

export const navItems: NavItem[] = [
  { label: "Accueil", to: "/dashboard", icon: IconHome, filter: null },
  {
    label: "Graphique",
    to: "/charts",
    icon: IconChartPie,
    filter: "chartsFilter",
  },
  {
    label: "Transactions",
    to: "/transactions",
    icon: IconArrowLeftRight,
    filter: "addTransactionButton",
  },
  { label: "Objectifs", to: "/goals", icon: IconGoal, filter: "goalsFilter" },
];
