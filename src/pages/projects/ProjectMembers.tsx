import { useMemo, useState } from "react";

import { ArrowLeft, UserPlus, UserRound, X } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import Modal from "../../components/ui/Modal";

import { useAppSelector } from "../../redux/hooks";

import { canManageProjectMembers } from "../../utils/permissions/project.permissions";
import {
  selectCurrentOrganizationId,
  selectCurrentOrganizationRole,
} from "../../hooks/organization/organization.selectors";
import { useProject } from "../../hooks/project/useProjects";
import {
  useAddProjectMember,
  useProjectMembers,
  useRemoveProjectMember,
} from "../../hooks/project/useProjectMembers";
import { useOrganizationMembers } from "../../hooks/organization/useOrganizationMembers";

const ProjectMembers = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const organizationId = useAppSelector(selectCurrentOrganizationId);

  const organizationRole = useAppSelector(selectCurrentOrganizationRole);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: project, isLoading: projectLoading } = useProject(projectId);

  const {
    data: projectMembers = [],
    isLoading: membersLoading,
    isError,
  } = useProjectMembers(projectId);

  const { data: organizationMembers = [] } = useOrganizationMembers(
    organizationId as string
  );

  const addMember = useAddProjectMember(projectId!);

  const removeMember = useRemoveProjectMember(projectId!);

  const existingUserIds = useMemo(
    () => new Set(projectMembers.map((member) => member.userId)),
    [projectMembers]
  );

  const availableMembers = organizationMembers.filter(
    (member) => !existingUserIds.has(member.userId)
  );

  const canManage = canManageProjectMembers(organizationRole);

  const handleAdd = async (userId: string) => {
    await addMember.mutateAsync(userId);

    setIsAddOpen(false);
  };

  const handleRemove = async (userId: string, name: string) => {
    const confirmed = window.confirm(`Remove ${name} from this project?`);

    if (!confirmed) {
      return;
    }

    await removeMember.mutateAsync(userId);
  };

  if (!organizationId) {
    return (
      <PageContainer>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-700">
          Select an organization first.
        </div>
      </PageContainer>
    );
  }

  if (projectLoading) {
    return (
      <PageContainer>
        <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
      </PageContainer>
    );
  }

  if (!project) {
    return (
      <PageContainer>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Project could not be found.
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <div className="mb-6">
          <Link
            to={`/organizations/${organizationId}/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to project
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              {project.name}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Project members
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage users who can work on this project.
            </p>
          </div>

          {canManage && (
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              disabled={availableMembers.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <UserPlus size={18} />
              Add member
            </button>
          )}
        </div>

        {membersLoading && (
          <div className="space-y-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Unable to load project members.
          </div>
        )}

        {!membersLoading && !isError && projectMembers.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <UserRound className="mx-auto text-slate-400" size={30} />

            <h2 className="mt-3 text-base font-semibold text-slate-900">
              No project members
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add organization members to this project.
            </p>
          </div>
        )}

        {!membersLoading && !isError && projectMembers.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {projectMembers.map((member) => {
                const name = member.user?.name ?? "Unknown user";

                const email = member.user?.email ?? "";

                return (
                  <div
                    key={member.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">
                        {name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {name}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                          {email}
                        </p>
                      </div>
                    </div>

                    {canManage && (
                      <button
                        type="button"
                        onClick={() => handleRemove(member.userId, name)}
                        disabled={removeMember.isPending}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 sm:self-auto"
                      >
                        <X size={16} />
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PageContainer>

      <Modal
        open={isAddOpen}
        title="Add project member"
        onClose={() => setIsAddOpen(false)}
      >
        {availableMembers.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            All organization members are already part of this project.
          </div>
        ) : (
          <div className="space-y-2">
            {availableMembers.map((member) => {
              const name = member.user?.name ?? "Unknown user";

              const email = member.user?.email ?? "";

              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleAdd(member.userId)}
                  disabled={addMember.isPending}
                  className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                    {name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {name}
                    </p>

                    <p className="truncate text-xs text-slate-500">{email}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectMembers;
