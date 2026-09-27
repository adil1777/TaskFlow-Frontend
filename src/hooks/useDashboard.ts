import { useQuery } from "@tanstack/react-query";

import { getProjectDashboard } from "../api/dashboard.api";
import { dashboardQueryKeys } from "../utils/query/queryKeys";

import { useAuth } from "./auth/useAuth";

export const useProjectDashboard = (projectId: string) => {
  const { organizationId } = useAuth();

  return useQuery({
    queryKey: dashboardQueryKeys.project(organizationId ?? "", projectId),

    queryFn: () => getProjectDashboard(projectId),

    enabled: Boolean(organizationId) && Boolean(projectId),

    staleTime: 30 * 1000,

    refetchOnWindowFocus: true,
  });
};
