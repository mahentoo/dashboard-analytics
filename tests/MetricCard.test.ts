import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import MetricCard from '~/components/ui/MetricCard.vue';

const stubs = {
  UCard: {
    template: '<div><slot /></div>',
  },
  UIcon: true,
  USkeleton: true,
};

describe('MetricCard', () => {
  it('should show skeleton when loading', async () => {
    const component = await mountSuspended(MetricCard, {
      props: {
        title: 'Receita',
        value: 'R$ 100',
        loading: true,
      },
      global: {
        stubs,
      },
    });

    expect(component.text()).toContain('Receita');
    expect(component.find('.h-8.w-24').exists()).toBe(true);
    expect(component.text()).not.toContain('R$ 100');
  });

  it('should show value when not loading', async () => {
    const component = await mountSuspended(MetricCard, {
      props: {
        title: 'Receita',
        value: 'R$ 100',
        loading: false,
      },
      global: {
        stubs,
      },
    });

    expect(component.text()).toContain('Receita');
    expect(component.find('.h-8.w-24').exists()).toBe(false);
    expect(component.text()).toContain('R$ 100');
  });
});
