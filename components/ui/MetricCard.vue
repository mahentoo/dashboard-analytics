<script setup lang="ts">
defineProps<{
  loading?: boolean;
  title: string;
  value: string | number;
}>();
</script>

<template>
  <UCard>
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-neutral-500">{{ title }}</p>
        <div
          v-if="loading"
          class="mt-1"
        >
          <USkeleton class="h-8 w-24" />
        </div>
        <p
          v-else
          class="mt-1 text-2xl font-semibold"
        >
          {{ value }}
        </p>
      </div>
    </div>
  </UCard>
</template>
