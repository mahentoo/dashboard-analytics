<script setup lang="ts">
import type { TransactionsResponse } from '~/types/analytics';

const periodStore = usePeriodStore();
const { period } = storeToRefs(periodStore);

const search = ref('');
const debouncedSearch = useDebounce(search, 300);
const page = ref(1);
const perPage = 12;

const {
  data,
  status,
  error,
  refresh,
} = await useFetch<TransactionsResponse>(
  '/api/transactions',
  {
    lazy: true,
    query: {
      page,
      perPage,
      period,
      q: debouncedSearch,
    },
    watch: [
      debouncedSearch,
      page,
      period,
    ],
  },
);

const loading = computed(() => status.value === 'pending');
const hasError = computed(() => Boolean(error.value));
const pagination = computed(() => data.value?.meta);
const transactions = computed(() => data.value?.transactions ?? []);

const statusColors = {
  pending: 'warning',
  paid: 'success',
  failed: 'error',
} as const;

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  failed: 'Falhou',
};

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Cliente' },
  { key: 'amount', label: 'Valor' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Data' },
];

watch([debouncedSearch, period], () => {
  page.value = 1;
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Transações</h1>
        <p class="mt-1 text-sm text-neutral-500">
          {{ pagination?.total ?? 0 }} transações nos últimos {{ period }} dias
        </p>
      </div>
      <UInput
        v-model="search"
        class="w-64"
        icon="i-heroicons-magnifying-glass"
        placeholder="Buscar por ID ou cliente..."
      />
    </div>
    <UCard>
      <div
        v-if="loading"
        class="space-y-3 p-4"
      >
        <USkeleton
          v-for="i in 120"
          :key="i"
          class="h-12 w-full"
        />
      </div>
      <div
        v-else-if="hasError"
        class="p-6"
      >
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold text-neutral-900 dark:text-white">
              Não foi possível carregar as transações.
            </p>
            <p class="mt-1 text-sm text-neutral-500">
              Tente novamente em instantes.
            </p>
          </div>
          <UButton
            color="primary"
            variant="solid"
            @click="refresh"
          >
            Tentar novamente
          </UButton>
        </div>
      </div>
      <table
        v-else
        class="w-full"
      >
        <thead>
          <tr class="border-b border-neutral-200 dark:border-neutral-800">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-b border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
          >
            <td class="px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white">
              {{ transaction.id }}
            </td>
            <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
              {{ transaction.customer }}
            </td>
            <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
              {{ formatCurrency(transaction.amount) }}
            </td>
            <td class="px-4 py-3">
              <UBadge
                :color="statusColors[transaction.status]"
                variant="subtle"
              >
                {{ statusLabels[transaction.status] }}
              </UBadge>
            </td>
            <td class="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
              {{ formatDate(transaction.createdAt) }}
            </td>
          </tr>
          <tr v-if="!transactions.length">
            <td
              class="px-4 py-8 text-center text-sm text-neutral-500"
              colspan="5"
            >
              Nenhuma transação encontrada.
            </td>
          </tr>
        </tbody>
      </table>
      <template
        v-if="(pagination?.lastPage ?? 0) > 1"
        #footer
      >
        <div class="flex items-center justify-between border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <p class="text-sm text-neutral-500">
            Página {{ pagination?.currentPage ?? 1 }} de {{ pagination?.lastPage ?? 1 }}
            ({{ pagination?.total ?? 0 }} itens)
          </p>
          <UPagination
            v-model:page="page"
            :items-per-page="perPage"
            :total="pagination?.total ?? 0"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
