<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const props = defineProps<{
  labels: string[];
  values: number[];
  loading?: boolean;
}>();

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Receita',
      data: props.values,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
};
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-medium">Evolução de Receita</h3>
    </template>
    <div
      v-if="loading"
      class="flex h-64 items-center justify-center"
    >
      <USkeleton class="h-full w-full" />
    </div>
    <div
      v-else
      class="h-64"
    >
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </UCard>
</template>
