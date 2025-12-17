const clampPeriod = (periodRaw: unknown): 7 | 30 | 90 => {
  const raw = Array.isArray(periodRaw) ? periodRaw[0] : periodRaw;
  if (raw === '30' || raw === 30) return 30;
  if (raw === '90' || raw === 90) return 90;
  return 7;
};

export default defineEventHandler(event => {
  const query = getQuery(event);
  const period = clampPeriod(query.period);

  const activeUsers = Math.round(1200 + period * 18);
  const revenue = Math.round(42000 + period * 650);
  const conversions = Math.round(320 + period * 4);
  const growthRate = Number((1.8 + (period / 90) * 3.2).toFixed(1));

  return {
    metrics: {
      activeUsers,
      revenue,
      conversions,
      growthRate,
    },
  };
});
