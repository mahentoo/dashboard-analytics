export const useDebounce = <T>(value: Ref<T>, delay = 300): Ref<T> => {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  watch(value, newValue => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  if (getCurrentInstance()) {
    onUnmounted(() => {
      if (timeout) clearTimeout(timeout);
    });
  }

  return debouncedValue;
};
