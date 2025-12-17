# Analytics Dashboard

Dashboard de Analytics para plataforma SaaS desenvolvido com Nuxt 3, Vue 3 Composition API, TypeScript, Pinia e Tailwind CSS.

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes
npm run test
npm run test:watch
npm run test:coverage

# Build de produção
npm run build

# Lint
npm run lint
npm run lint:fix
```

O servidor de desenvolvimento estará disponível em `http://localhost:3000`.

## 📁 Estrutura do Projeto

```
/components
  /ui                  # Componentes reutilizáveis (MetricCard, PeriodFilter)
  /dashboard           # Componentes do dashboard (RevenueLineChart)
/composables           # Lógica reutilizável (useDebounce)
/stores                # Pinia stores (usePeriodStore)
/types                 # Interfaces TypeScript
/server/api            # API routes do Nuxt (metrics, timeSeries, transactions)
/pages                 # Páginas (index.vue, transactions.vue)
/layouts               # Layout com navegação
/tests                 # Testes unitários
/utils                 # Funções auxiliares
```

## 🔧 Decisões Técnicas

### 1. Gerenciamento de Estado com Pinia + Cookie SSR

Para o filtro global de período, optei por usar Pinia em conjunto com `useCookie` do Nuxt. Essa abordagem garante que o estado seja persistido entre navegações e funcione corretamente em SSR, já que cookies são acessíveis tanto no servidor quanto no cliente. A store `usePeriodStore` expõe o período atual e as opções disponíveis.

### 2. Lazy Loading do Gráfico com Chart.js

O componente de gráfico (`RevenueLineChart.client.vue`) utiliza a convenção `.client.vue` do Nuxt para garantir que seja renderizado apenas no cliente, evitando problema de SSR com Chart.js. Além disso, o componente é carregado de forma lazy via `defineAsyncComponent`, melhorando o tempo de carregamento inicial da página. O Chart.js foi escolhido por sua ampla adoção, boa documentação e integração simples com Vue via `vue-chartjs`.

### 3. Data Fetching com useFetch e Watch Reativo

Para buscar dados das APIs, utilizei `useFetch` com a opção `watch` apontando para o período da store. Isso garante que sempre que o usuário trocar o período no filtro global, os dados são automaticamente re-fetched tanto no dashboard quanto na listagem. A estratégia de loading states foi implementada verificando o `status` retornado pelo `useFetch`.

### 4. Debounce na Busca com Composable Customizado

Criei o composable `useDebounce` para evitar requisições excessivas durante a digitação na busca. O composable é genérico e reutilizável, recebendo qualquer `Ref<T>` e um delay configurable. Na página de listagem, a busca é debounced em 300ms antes de disparar uma nova requisição à API.


## ⏰ O que faria diferente com mais tempo

1. **Internacionalização (i18n)**: Prepararia a aplicação para múltiplos idiomas usando `@nuxtjs/i18n`.

2. **Dark Mode**: Embora o Tailwind esteja configurado para dark mode, faltou implementar o toggle e persistência da preferência do usuário.

3. **Testes**: Implementaria testes de integração e testes E2E. Os testes atuais são unitários e evitam a complexidade do mocking de auto-imports, bem como fluxos completos de usuário.

4. **Paginação**: Equivoquei-me e implementei paginação server-side ao invés de client-side.

## ✅ Checklist

- [x] `npm run build` executa sem erros
- [x] `npm run dev` inicia corretamente
- [x] SSR habilitado (`ssr: true`)
- [x] Testes passam (`npm run test`)
- [x] Lint passa (`npm run lint`)
- [x] Filtro global persiste ao navegar
- [x] Loading states implementados
- [x] Lazy loading do gráfico
- [x] Debounce na busca
