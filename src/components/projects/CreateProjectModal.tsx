import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";

import { useCreateProject } from "../../hooks/useProjects";

import { createProjectSchema } from "../../utils/validations/projectSchema";

import type { CreateProjectFormData, CreateProjectModalProps } from "../../utils/types/project";

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    mutateAsync,
    isPending,
    isError,
    reset: resetMutation,
  } = useCreateProject();

  /*
   * Reset form and mutation state when modal is closed.
   *
   * Do not put the complete mutation object in the
   * dependency array because its reference may change
   * between renders.
   */
  useEffect(() => {
    if (!open) {
      reset({
        name: "",
        description: "",
      });

      resetMutation();
    }
  }, [open, reset, resetMutation]);

  if (!open) {
    return null;
  }

  const onSubmit = async (data: CreateProjectFormData) => {
    try {
      await mutateAsync({
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
      });

      reset();

      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const isLoading = isSubmitting || isPending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-project-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2
              id="create-project-title"
              className="text-lg font-semibold text-slate-900"
            >
              Create Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new project in your organization.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close create project modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 p-6"
        >
          {/* Project Name */}
          <div>
            <label
              htmlFor="project-name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Project Name
            </label>

            <input
              id="project-name"
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="e.g. TaskFlow Web App"
              disabled={isLoading}
              {...register("name")}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-500"
              } disabled:cursor-not-allowed disabled:bg-slate-50`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="project-description"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="project-description"
              rows={4}
              placeholder="Describe your project..."
              disabled={isLoading}
              {...register("description")}
              className={`w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
                errors.description
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-500"
              } disabled:cursor-not-allowed disabled:bg-slate-50`}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Server Error */}
          {isError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                Failed to create project. Please try again.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
