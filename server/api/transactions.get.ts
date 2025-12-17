const clampPeriod = (periodRaw: unknown): 7 | 30 | 90 => {
  const raw = Array.isArray(periodRaw) ? periodRaw[0] : periodRaw;
  if (raw === '30' || raw === 30) return 30;
  if (raw === '90' || raw === 90) return 90;
  return 7;
};

const makeName = (i: number): string => {
  const first = [
    'Ana',
    'Bruno',
    'Carla',
    'Diego',
    'Eduardo',
    'Fernanda',
    'Gabriela',
    'Henrique',
    'Iara',
    'Joao',
  ];
  const last = [
    'Silva',
    'Souza',
    'Oliveira',
    'Santos',
    'Pereira',
    'Lima',
    'Costa',
    'Ferreira',
    'Almeida',
    'Gomes',
  ];
  return `${first[i % first.length]} ${last[i % last.length]}`;
};

const TOTAL_ITEMS = 120;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const generateItems = () => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  const today = now.getTime();
  const ninetyDaysMs = 90 * MS_PER_DAY;

  const items = Array.from({ length: TOTAL_ITEMS }).map((_, idx) => {
    const i = idx + 1;
    const randomMs = Math.floor(seededRandom(i * 17) * ninetyDaysMs);
    const randomHourMs = Math.floor(seededRandom(i * 31) * MS_PER_DAY);
    const createdAt = new Date(today - randomMs - randomHourMs);

    const amount = Number((49 + ((i * 13) % 240) + ((i * 7) % 50)).toFixed(2));
    const status = (i % 3 === 0) ? 'failed' : ((i % 2 === 0) ? 'paid' : 'pending');

    return {
      id: `TX-${String(i).padStart(4, '0')}`,
      customer: makeName(i),
      amount,
      status: status as 'pending' | 'paid' | 'failed',
      createdAt: createdAt.toISOString(),
    };
  });

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const allTransactions = generateItems();

export default defineEventHandler(event => {
  const query = getQuery(event);
  const period = clampPeriod(query.period);

  const now = new Date();
  now.setHours(23, 59, 59, 999);
  const cutoffDate = new Date(now.getTime() - period * MS_PER_DAY);

  return {
    transactions: allTransactions.filter(t => new Date(t.createdAt) >= cutoffDate),
  };
});
