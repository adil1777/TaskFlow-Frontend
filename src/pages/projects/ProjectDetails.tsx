import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Users,
} from "lucide-react";

import PageContainer from "../../components/layout/PageContainer";


import {
  useAppSelector,
} from "../../redux/hooks";
import { selectCurrentOrganizationId } from "../../hooks/organization/organization.selectors";
import { useProject } from "../../hooks/project/useProjects";

const ProjectDetails =
  () => {
    const {
      projectId,
    } = useParams<{
      projectId: string;
    }>();

    const navigate =
      useNavigate();

    const organizationId =
      useAppSelector(
        selectCurrentOrganizationId
      );

    const {
      data: project,
      isLoading,
      isError,
    } =
      useProject(
        projectId
      );

    if (isLoading) {
      return (
        <PageContainer>
          <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
        </PageContainer>
      );
    }

    if (
      isError ||
      !project
    ) {
      return (
        <PageContainer>
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h1 className="font-semibold text-red-800">
              Project not found
            </h1>

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="mt-4 text-sm font-medium text-red-700 underline"
            >
              Go back
            </button>
          </div>
        </PageContainer>
      );
    }

    return (
      <PageContainer>
        <div className="mb-6">
          <Link
            to={`/organizations/${organizationId}/projects`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft
              size={16}
            />
            Back to projects
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {project.name}
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  {project.description ||
                    "No project description."}
                </p>
              </div>

              <Link
                to={`/organizations/${organizationId}/projects/${project.id}/members`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Users
                  size={17}
                />
                Members
              </Link>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Project ID
              </p>

              <p className="mt-1 break-all text-sm text-slate-700">
                {project.id}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Manager
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {project.managerId
                  ? project.managerId
                  : "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Created
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {new Date(
                  project.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  };

export default ProjectDetails;