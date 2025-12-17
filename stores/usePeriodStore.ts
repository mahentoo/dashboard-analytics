import type { Period } from '~/types/analytics';

export const usePeriodStore = defineStore('periodStore', () => {
  const period = useCookie<Period>('period', { default: () => 7 });

  const periods = ref([
    {
      label: '7 dias',
      value: 7,
    },
    {
      label: '30 dias',
      value: 30,
    },
    {
      label: '90 dias',
      value: 90,
    },
  ]);

  return {
    period,
    periods,
  };
});
