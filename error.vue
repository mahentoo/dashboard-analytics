<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-10">
    <UCard class="w-full">
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-xl font-bold text-neutral-900 dark:text-white">
            Ocorreu um erro
          </h1>
          <p class="mt-2 text-sm text-neutral-500">
            {{ error.statusCode ? `Código: ${error.statusCode}` : 'Não foi possível completar a requisição.' }}
          </p>
          <p
            v-if="error.message"
            class="mt-2 text-sm text-neutral-500"
          >
            {{ error.message }}
          </p>
        </div>

        <div class="flex flex-col gap-2 sm:flex-row">
          <UButton
            color="primary"
            variant="solid"
            @click="handleError"
          >
            Voltar para o início
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
