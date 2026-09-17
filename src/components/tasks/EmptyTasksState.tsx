interface EmptyTasksStateProps {
  hasTasks: boolean;
}

const EmptyTasksState = ({
  hasTasks,
}: EmptyTasksStateProps) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-dashed
        border-slate-300
        bg-white
        p-10
        text-center

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <h3
        className="
          font-semibold
          text-slate-900

          dark:text-white
        "
      >
        {hasTasks
          ? "No tasks found"
          : "No tasks yet"}
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-slate-500

          dark:text-slate-400
        "
      >
        {hasTasks
          ? "Try changing or clearing your filters."
          : "Create your first task for this project."}
      </p>

      {!hasTasks && (
        <button
          type="button"
          className="
            mt-4
            rounded-lg
            bg-slate-900
            px-4 py-2
            text-sm
            font-medium
            text-white
            transition-colors

            hover:bg-slate-800

            focus:outline-none
            focus:ring-2
            focus:ring-slate-400
            focus:ring-offset-2

            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-200
          "
        >
          Create Task
        </button>
      )}
    </div>
  );
};

export default EmptyTasksState;