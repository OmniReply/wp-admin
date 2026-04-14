
import { client } from './client';
import type { ApiResponse } from '@/types/common';
import type { DashboardStatsResponse } from '@/types/openapi';

export const dashboardApi = {
  stats: () => client.get<ApiResponse<DashboardStatsResponse>>('/dashboard/stats'),
};
