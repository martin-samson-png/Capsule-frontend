<script setup lang="ts">
import { useToast } from "~/composable/useToast";

const { message, type } = useToast();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="message"
        :class="type === 'success' ? 'bg-green-600' : 'bg-red-600'"
        class="fixed bottom-5 right-5 text-white px-6 py-3 rounded-lg shadow-xl z-50"
      >
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
