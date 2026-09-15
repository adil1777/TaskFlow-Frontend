import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useCreateProject } from "../../hooks/useProjects";
import { createProjectSchema } from "../../utils/validations/projectSchema";
import type {
  CreateProjectFormData,
  CreateProjectModalProps,
} from "../../utils/types/project";

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "", description: "" },
  });

  const {
    mutateAsync,
    isPending,
    isError,
    reset: resetMutation,
  } = useCreateProject();
  useEffect(() => {
    if (!open) {
      reset({ name: "", description: "" });
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
      className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px] dark:bg-black/60 "
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-project-title"
    >
      {" "}
      {/* Modal */}{" "}
      <div className=" w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 ">
        {" "}
        {/* Header */}{" "}
        <div className=" flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800 ">
          {" "}
          <div>
            {" "}
            <h2
              id="create-project-title"
              className=" text-lg font-semibold text-slate-900 dark:text-white "
            >
              {" "}
              Create Project{" "}
            </h2>{" "}
            <p className=" mt-1 text-sm text-slate-500 dark:text-slate-400 ">
              {" "}
              Create a new project in your organization.{" "}
            </p>{" "}
          </div>{" "}
          {/* Close */}{" "}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close create project modal"
            className=" rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 "
          >
            {" "}
            <X size={20} />{" "}
          </button>{" "}
        </div>{" "}
        {/* Form */}{" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 p-6"
        >
          {" "}
          {/* Project Name */}{" "}
          <div>
            {" "}
            <label
              htmlFor="project-name"
              className=" mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300 "
            >
              {" "}
              Project Name{" "}
            </label>{" "}
            <input
              id="project-name"
              type="text"
              autoFocus
              autoComplete="off"
              placeholder="e.g. TaskFlow Web App"
              disabled={isLoading}
              {...register("name")}
              className={` w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 caret-slate-900 outline-none transition placeholder:text-slate-400 dark:bg-slate-950 dark:text-white dark:caret-white dark:placeholder:text-slate-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900 ${errors.name ? ` border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 ` : ` border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/10 dark:border-slate-700 dark:focus:border-slate-500 dark:focus:ring-slate-500/10 `} `}
            />{" "}
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                {" "}
                {errors.name.message}{" "}
              </p>
            )}{" "}
          </div>{" "}
          {/* Description */}{" "}
          <div>
            {" "}
            <label
              htmlFor="project-description"
              className=" mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300 "
            >
              {" "}
              Description{" "}
            </label>{" "}
            <textarea
              id="project-description"
              rows={4}
              placeholder="Describe your project..."
              disabled={isLoading}
              {...register("description")}
              className={` w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 caret-slate-900 outline-none transition placeholder:text-slate-400 dark:bg-slate-950 dark:text-white dark:caret-white dark:placeholder:text-slate-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900 ${errors.description ? ` border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 ` : ` border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/10 dark:border-slate-700 dark:focus:border-slate-500 dark:focus:ring-slate-500/10 `} `}
            />{" "}
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-500 dark:text-red-400">
                {" "}
                {errors.description.message}{" "}
              </p>
            )}{" "}
          </div>{" "}
          {/* Server Error */}{" "}
          {isError && (
            <div className=" rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-950/30 ">
              {" "}
              <p className=" text-sm text-red-600 dark:text-red-400 ">
                {" "}
                Failed to create project. Please try again.{" "}
              </p>{" "}
            </div>
          )}{" "}
          {/* Actions */}{" "}
          <div className=" flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 ">
            {" "}
            {/* Cancel */}{" "}
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className=" rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 "
            >
              {" "}
              Cancel{" "}
            </button>{" "}
            {/* Create */}{" "}
            <button
              type="submit"
              disabled={isLoading}
              className=" rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 "
            >
              {" "}
              {isLoading ? "Creating..." : "Create Project"}{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default CreateProjectModal;
