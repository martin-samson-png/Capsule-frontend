import {
  IconHome,
  IconChartPie,
  IconArrowLeftRight,
  IconGoal,
} from "#components";
import type { Component } from "vue";

export type FilterKey =
  | "chartsFilter"
  | "addTransactionButton"
  | "transactionFilter"
  | "goalsFilter";

type NavItem = {
  label: string;
  to: string;
  icon: Component;
  filter?: FilterKey | FilterKey[];
};

export const navItems: NavItem[] = [
  { label: "Accueil", to: "/dashboard", icon: IconHome },
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
    filter: ["addTransactionButton", "transactionFilter"],
  },
  { label: "Objectifs", to: "/goals", icon: IconGoal, filter: "goalsFilter" },
];
