import api from "./axios";

import type { DashboardResponse } from "../utils/types/dashboard";

export const getProjectDashboard = async (
  projectId: string
): Promise<DashboardResponse> => {
  const response = await api.get(`/projects/${projectId}/dashboard`);

   console.log("response dashboard4444444",response);
    console.log("response dashboard55555555",response.data);

  return response.data;
};
