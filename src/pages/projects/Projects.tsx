import { useState } from "react";

import { Plus } from "lucide-react";

import PageContainer from "../../components/layout/PageContainer";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectForm from "../../components/projects/ProjectForm";
import Modal from "../../components/ui/Modal";

import { useAppSelector } from "../../redux/hooks";

import {
  canCreateProject,
  canUpdateProject,
} from "../../utils/permissions/project.permissions";

import type { CreateProjectFormData, Project } from "../../utils/types/project";
import {
  selectCurrentOrganizationId,
  selectCurrentOrganizationRole,
} from "../../hooks/organization/organization.selectors";
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "../../hooks/project/useProjects";

const Projects = () => {
  const organizationId = useAppSelector(selectCurrentOrganizationId);

  const organizationRole = useAppSelector(selectCurrentOrganizationRole);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects(organizationId);

  const createProject = useCreateProject(organizationId!);

  const updateProject = useUpdateProject(organizationId!);

  const deleteProject = useDeleteProject(organizationId!);

  const handleCreate = async (values: CreateProjectFormData) => {
    if (!organizationId) {
      return;
    }

    await createProject.mutateAsync({
      name: values.name,
      description: values.description || undefined,
      managerId: values.managerId || undefined,
    });

    setIsCreateOpen(false);
  };

  const handleUpdate = async (values: CreateProjectFormData) => {
    if (!editingProject) {
      return;
    }

    await updateProject.mutateAsync({
      projectId: editingProject.id,

      payload: {
        name: values.name,

        description: values.description || undefined,

        managerId: values.managerId || null,
      },
    });

    setEditingProject(null);
  };

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(`Delete "${project.name}"?`);

    if (!confirmed) {
      return;
    }

    await deleteProject.mutateAsync(project.id);
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

  return (
    <>
      <PageContainer>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Projects
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage projects within this organization.
            </p>
          </div>

          {canCreateProject(organizationRole) && (
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              New project
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Unable to load projects. Please try again.
          </div>
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-base font-semibold text-slate-900">
              No projects yet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create your first project to get started.
            </p>
          </div>
        )}

        {!isLoading && !isError && projects.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                organizationId={organizationId}
                canManage={canUpdateProject(organizationRole)}
                onEdit={setEditingProject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </PageContainer>

      <Modal
        open={isCreateOpen}
        title="Create project"
        onClose={() => setIsCreateOpen(false)}
      >
        <ProjectForm
          loading={createProject.isPending}
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>

      <Modal
        open={Boolean(editingProject)}
        title="Edit project"
        onClose={() => setEditingProject(null)}
      >
        <ProjectForm
          project={editingProject}
          loading={updateProject.isPending}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProject(null)}
        />
      </Modal>
    </>
  );
};

export default Projects;
