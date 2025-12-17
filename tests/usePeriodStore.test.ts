import { describe, expect, it } from 'vitest';

describe('usePeriodStore', () => {
  it('should create store with correct structure', () => {
    const store = usePeriodStore();

    expect(store).toBeDefined();
    expect(store.periods).toHaveLength(3);
  });

  it('should have periods array with correct options', () => {
    const store = usePeriodStore();

    expect(store.periods.map(p => p.value)).toEqual([
      7,
      30,
      90,
    ]);
    expect(store.periods.map(p => p.label)).toEqual([
      '7 dias',
      '30 dias',
      '90 dias',
    ]);
  });
});
