<script setup lang="ts">
const periodStore = usePeriodStore();
const { period, periods } = storeToRefs(periodStore);
</script>

<template>
  <USelect
    v-model="period"
    class="w-48"
    :items="periods"
  />
</template>
