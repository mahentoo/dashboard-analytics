<script setup lang="ts">
const route = useRoute();

const mobileMenuOpen = ref(false);

const links = [
  {
    label: 'Dashboard',
    to: '/',
    icon: 'i-heroicons-home',
  },
  {
    label: 'Transações',
    to: '/transactions',
    icon: 'i-heroicons-table-cells',
  },
];

watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <header class="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <UButton
              class="sm:hidden"
              icon="i-heroicons-bars-3"
              size="sm"
              variant="ghost"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
            <h1 class="text-xl font-bold text-primary-600">Analytics Dashboard</h1>
          </div>
          <nav class="hidden items-center gap-1 sm:flex">
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              active-class="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
              class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              :to="link.to"
            >
              <UIcon
                class="h-4 w-4"
                :name="link.icon"
              />
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>
      <div
        v-if="mobileMenuOpen"
        class="border-t border-neutral-200 sm:hidden dark:border-neutral-800"
      >
        <nav class="space-y-1 px-4 py-3">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            active-class="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
            class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            :to="link.to"
          >
            <UIcon
              class="h-5 w-5"
              :name="link.icon"
            />
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
