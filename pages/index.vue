<script setup lang="ts">
import type { MetricsResponse, TimeSeriesResponse } from '~/types/analytics';

const periodStore = usePeriodStore();
const { period } = storeToRefs(periodStore);

const {
  data: metricsData,
  status,
  error: metricsError,
  refresh: refreshMetrics,
} = await useFetch<MetricsResponse>(
  '/api/metrics',
  {
    lazy: true,
    query: { period },
    watch: [period],
  },
);

const {
  data: timeSeriesData,
  status: timeSeriesStatus,
  error: timeSeriesError,
  refresh: refreshTimeSeries,
} = await useFetch<TimeSeriesResponse>(
  '/api/timeSeries',
  {
    query: { period },
    watch: [period],
  },
);

const chartLoading = computed(() => timeSeriesStatus.value === 'pending');
const loading = computed(() => status.value === 'pending');
const metrics = computed(() => metricsData.value?.metrics);
const series = computed(() => timeSeriesData.value?.series);

const hasError = computed(() => Boolean(metricsError.value || timeSeriesError.value));

const retry = () => {
  refreshMetrics();
  refreshTimeSeries();
};

const RevenueLineChart = defineAsyncComponent(
  () => import('~/components/dashboard/RevenueLineChart.client.vue'),
);
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
      <p class="mt-1 text-sm text-neutral-500">
        Métricas dos últimos {{ period }} dias
      </p>
    </div>
    <UCard v-if="hasError">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold text-neutral-900 dark:text-white">
            Não foi possível carregar os dados.
          </p>
          <p class="mt-1 text-sm text-neutral-500">
            Verifique sua conexão e tente novamente.
          </p>
        </div>
        <UButton
          color="primary"
          variant="solid"
          @click="retry"
        >
          Tentar novamente
        </UButton>
      </div>
    </UCard>
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
    <ClientOnly>
      <RevenueLineChart
        :labels="series?.labels ?? []"
        :loading="chartLoading"
        :values="series?.values ?? []"
      />
      <template #fallback>
        <UCard>
          <USkeleton class="h-64 w-full" />
        </UCard>
      </template>
    </ClientOnly>
  </div>
</template>
