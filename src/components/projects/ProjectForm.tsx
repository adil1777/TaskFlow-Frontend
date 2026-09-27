import {
  useEffect,
} from "react";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";


import type {
    CreateProjectFormData,
  Project,
} from "../../utils/types/project";
import { createProjectSchema } from "../../utils/validations/projectSchema";

interface ManagerOption {
  id: string;
  name: string;
  email: string;
}

interface ProjectFormProps {
  project?: Project | null;
  managers?: ManagerOption[];
  loading?: boolean;
  onSubmit: (
    values: CreateProjectFormData
  ) => void | Promise<void>;
  onCancel: () => void;
}

const ProjectForm = ({
  project,
  managers = [],
  loading = false,
  onSubmit,
  onCancel,
}: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {
      errors,
    },
  } = useForm<CreateProjectFormData>({
    resolver:
      zodResolver(
        createProjectSchema
      ),

    defaultValues: {
      name:
        project?.name ?? "",

      description:
        project?.description ??
        "",

      managerId:
        project?.managerId ??
        "",
    },
  });

  useEffect(() => {
    reset({
      name:
        project?.name ?? "",

      description:
        project?.description ??
        "",

      managerId:
        project?.managerId ??
        "",
    });
  }, [
    project,
    reset,
  ]);

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="project-name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Project name
        </label>

        <input
          id="project-name"
          {...register("name")}
          placeholder="e.g. Website Redesign"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.name && (
          <p className="mt-1 text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Description
        </label>

        <textarea
          id="project-description"
          rows={4}
          {...register(
            "description"
          )}
          placeholder="Describe the project..."
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-600">
            {
              errors.description
                .message
            }
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="project-manager"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Project manager
        </label>

        <Controller
          name="managerId"
          control={control}
          render={({
            field,
          }) => (
            <select
              id="project-manager"
              value={
                field.value ?? ""
              }
              onChange={
                field.onChange
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                No manager
              </option>

              {managers.map(
                (manager) => (
                  <option
                    key={
                      manager.id
                    }
                    value={
                      manager.id
                    }
                  >
                    {manager.name} (
                    {
                      manager.email
                    }
                    )
                  </option>
                )
              )}
            </select>
          )}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : project
              ? "Update project"
              : "Create project"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;