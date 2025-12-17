export type Period = 7 | 30 | 90;

export interface Metric {
    activeUsers: number;
    revenue: number;
    conversions: number;
    growthRate: number;
}

export interface MetricsResponse {
    metrics: Metric;
}

export interface Transaction {
    id: string;
    customer: string;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    createdAt: string;
}

export interface TransactionsResponse {
    transactions: Transaction[];
}
