export interface SystemOverviewMetrics {
  totalAccounts: number;
  totalAccountsGrowth: number;
  onlineAccounts: number;
  systemWarnings24h: number;
}

export interface RoleDistribution {
  role: string;
  percentage: number;
}

export interface TrafficData {
  day: string;
  requests: number;
}

export interface SystemOverviewResponse {
  metrics: SystemOverviewMetrics;
  roles: RoleDistribution[];
  traffic: TrafficData[];
}
