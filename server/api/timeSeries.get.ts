const MAX_DAYS = 90;

const clampPeriod = (periodRaw: unknown): 7 | 30 | 90 => {
  const raw = Array.isArray(periodRaw) ? periodRaw[0] : periodRaw;
  if (raw === '30' || raw === 30) return 30;
  if (raw === '90' || raw === 90) return 90;
  return 7;
};

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const generateFixedData = (): Array<{ date: string; value: number }> => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return Array.from({ length: MAX_DAYS }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (MAX_DAYS - 1 - i));

    const base = 150;
    const wave = Math.sin((i / 14) * Math.PI * 2) * 25;
    const trend = i * 0.4;
    const noise = (seededRandom(i * 17) - 0.5) * 30;

    return {
      date: formatDate(d),
      value: Math.round(base + wave + trend + noise),
    };
  });
};

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const allData = generateFixedData();

export default defineEventHandler(event => {
  const query = getQuery(event);
  const period = clampPeriod(query.period);

  const filtered = allData.slice(-period);

  return {
    series: {
      labels: filtered.map(d => d.date),
      values: filtered.map(d => d.value),
    },
  };
});
