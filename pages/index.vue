<script setup lang="ts">
import type { MetricsResponse } from '~/types/analytics';

const { data: metricsData, status } = await useFetch<MetricsResponse>(
  '/api/metrics',
  {
    lazy: true,
  },
);

const loading = computed(() => status.value === 'pending');
const metrics = computed(() => metricsData.value?.metrics);
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiMetricCard
        icon="i-heroicons-users"
        :loading="loading"
        title="Usuários Ativos"
        :value="metrics ? formatNumber(metrics.activeUsers) : '-'"
      />
      <UiMetricCard
        icon="i-heroicons-currency-dollar"
        :loading="loading"
        title="Receita"
        :value="metrics ? formatCurrency(metrics.revenue) : '-'"
      />
      <UiMetricCard
        icon="i-heroicons-chart-bar"
        :loading="loading"
        title="Conversões"
        :value="metrics ? formatNumber(metrics.conversions) : '-'"
      />
      <UiMetricCard
        icon="i-heroicons-arrow-trending-up"
        :loading="loading"
        title="Taxa de Crescimento"
        :value="metrics ? `${metrics.growthRate}%` : '-'"
      />
    </div>
  </div>
</template>
