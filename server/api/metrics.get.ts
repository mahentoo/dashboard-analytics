export default defineEventHandler(() => {
  const activeUsers = 1200;
  const revenue = 42000;
  const conversions = 320;
  const growthRate = 1.8;

  return {
    metrics: {
      activeUsers,
      revenue,
      conversions,
      growthRate,
    },
  };
});
