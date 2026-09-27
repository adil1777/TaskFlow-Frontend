export interface StatCardProps {
  label: string;
  value: number;
}

export interface InfoItemProps {
  label: string;
  value: string;
  mono?: boolean;
  capitalize?: boolean;
}

export interface DashboardCounts {
  todo: number;
  in_progress: number;
  review: number;
  done: number;
}

export interface DashboardData {
  total: number;
  counts: DashboardCounts;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}