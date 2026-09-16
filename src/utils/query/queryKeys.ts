export const projectQueryKeys = {
  all: ["projects"] as const,

  lists: () => [...projectQueryKeys.all, "list"] as const,

  list: (organizationId: string, page: number, limit: number) =>
    [...projectQueryKeys.lists(), organizationId, page, limit] as const,

  details: () => [...projectQueryKeys.all, "detail"] as const,

  detail: (organizationId: string, projectId: string) =>
    [...projectQueryKeys.details(), organizationId, projectId] as const,
};

export const taskQueryKeys = {
  all: ["tasks"] as const,

  projectLists: () => [...taskQueryKeys.all, "project"] as const,

  projectList: (
    organizationId: string,
    projectId: string,
    page: number,
    limit: number
  ) =>
    [
      ...taskQueryKeys.projectLists(),
      organizationId,
      projectId,
      page,
      limit,
    ] as const,

  details: () => [...taskQueryKeys.all, "detail"] as const,

  detail: (organizationId: string, taskId: string) =>
    [...taskQueryKeys.details(), organizationId, taskId] as const,
};
