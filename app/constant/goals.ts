import {
  PiggyBank,
  Target,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Plane,
  Globe,
  Tent,
  Camera,
  Ticket,
  Home,
  Car,
  Utensils,
  ShoppingBag,
  GraduationCap,
  Heart,
  Gift,
  Gamepad,
  Rocket,
  Shirt,
} from "lucide-vue-next";

import type { Component } from "vue";

export const goalIconsComponents: Record<string, Component> = {
  PiggyBank,
  Target,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Plane,
  Globe,
  Tent,
  Camera,
  Ticket,
  Home,
  Car,
  Utensils,
  ShoppingBag,
  GraduationCap,
  Heart,
  Gift,
  Gamepad,
  Rocket,
  Shirt,
};

export const availableGoalIcon = Object.keys(goalIconsComponents);

export const getGoalIcon = (iconName: string | null): Component => {
  if (!iconName) return Target;
  return goalIconsComponents[iconName] || Target;
};
