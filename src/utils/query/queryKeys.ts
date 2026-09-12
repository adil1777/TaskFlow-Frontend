export const projectQueryKeys = {
  all: ["projects"] as const,
  lists: () => [...projectQueryKeys.all, "list"] as const,
  list: (organizationId: string, page: number, limit: number) =>
    [...projectQueryKeys.lists(), organizationId, page, limit] as const,
  details: () => [...projectQueryKeys.all, "detail"] as const,
  detail: (organizationId: string, projectId: string) =>
    [...projectQueryKeys.details(), organizationId, projectId] as const,
};
