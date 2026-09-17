interface TaskPaginationProps {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  pageSize: number;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const TaskPagination = ({
  currentPage,
  totalPages,
  totalTasks,
  pageSize,
  isFetching,
  onPrevious,
  onNext,
}: TaskPaginationProps) => {
  const startItem =
    (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalTasks
  );

  return (
    <div
      className="
        mt-5
        flex
        flex-col
        gap-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <p
        className="
          text-sm
          text-slate-500

          dark:text-slate-400
        "
      >
        Showing{" "}
        <span
          className="
            font-medium
            text-slate-700

            dark:text-slate-200
          "
        >
          {startItem}
        </span>{" "}
        to{" "}
        <span
          className="
            font-medium
            text-slate-700

            dark:text-slate-200
          "
        >
          {endItem}
        </span>{" "}
        of{" "}
        <span
          className="
            font-medium
            text-slate-700

            dark:text-slate-200
          "
        >
          {totalTasks}
        </span>{" "}
        tasks
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={
            currentPage === 1 ||
            isFetching
          }
          onClick={onPrevious}
          className="
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4 py-2
            text-sm
            font-medium
            text-slate-700
            transition-colors

            hover:bg-slate-50

            focus:outline-none
            focus:ring-2
            focus:ring-slate-400
            focus:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:focus:ring-slate-600
            dark:focus:ring-offset-slate-950
          "
        >
          Previous
        </button>

        <span
          className="
            min-w-[90px]
            text-center
            text-sm
            text-slate-600

            dark:text-slate-400
          "
        >
          Page{" "}
          <span
            className="
              font-medium
              text-slate-900

              dark:text-white
            "
          >
            {currentPage}
          </span>{" "}
          of{" "}
          <span
            className="
              font-medium
              text-slate-900

              dark:text-white
            "
          >
            {totalPages}
          </span>
        </span>

        <button
          type="button"
          disabled={
            currentPage === totalPages ||
            isFetching
          }
          onClick={onNext}
          className="
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4 py-2
            text-sm
            font-medium
            text-slate-700
            transition-colors

            hover:bg-slate-50

            focus:outline-none
            focus:ring-2
            focus:ring-slate-400
            focus:ring-offset-2

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:focus:ring-slate-600
            dark:focus:ring-offset-slate-950
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;