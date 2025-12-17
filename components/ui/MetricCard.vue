<script setup lang="ts">
defineProps<{
  icon?: string;
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
      <div
        v-if="icon"
        class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600"
      >
        <UIcon
          class="h-6 w-6"
          :name="icon"
        />
      </div>
    </div>
  </UCard>
</template>
