import { describe, expect, it } from 'vitest';

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 300);

    expect(debounced.value).toBe('initial');
  });

  it('should update debounced value after delay', async () => {
    const value = ref('initial');
    const debounced = useDebounce(value, 50);

    value.value = 'changed';
    await nextTick();

    expect(debounced.value).toBe('initial');

    await new Promise(resolve => setTimeout(resolve, 60));

    expect(debounced.value).toBe('changed');
  });

  it('should handle multiple value types', () => {
    const numValue = ref(0);
    const debouncedNum = useDebounce(numValue, 100);
    expect(debouncedNum.value).toBe(0);

    const objValue = ref({ name: 'test' });
    const debouncedObj = useDebounce(objValue, 100);
    expect(debouncedObj.value).toEqual({ name: 'test' });
  });
});
