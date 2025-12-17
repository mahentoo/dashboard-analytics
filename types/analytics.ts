export interface Metric {
    activeUsers: number;
    revenue: number;
    conversions: number;
    growthRate: number;
}

export interface MetricsResponse {
    metrics: Metric;
}
