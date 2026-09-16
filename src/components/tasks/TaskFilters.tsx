import { Search, X } from "lucide-react";

import type {
  TaskFilters as TaskFiltersType,
  TaskPriority,
  TaskStatus,
} from "../../utils/types/task";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
}

const STATUS_OPTIONS: Array<{
  value: TaskStatus;
  label: string;
}> = [
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "review",
    label: "Review",
  },
  {
    value: "done",
    label: "Done",
  },
];

const PRIORITY_OPTIONS: Array<{
  value: TaskPriority;
  label: string;
}> = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "urgent",
    label: "Urgent",
  },
];

const TaskFilters = ({
  filters,
  onChange,
}: TaskFiltersProps) => {
  const updateFilter = <
    K extends keyof TaskFiltersType
  >(
    key: K,
    value: TaskFiltersType[K]
  ) => {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  const hasFilters = Object.values(filters).some(
    (value) => Boolean(value)
  );

  return (
    <section
      aria-label="Task filters"
      className="
        mb-5
        rounded-xl
        border border-slate-200
        bg-white
        p-4
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          grid gap-3
          sm:grid-cols-2
          lg:grid-cols-6
        "
      >
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search
            size={18}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-3 top-1/2
              -translate-y-1/2
              text-slate-400
              dark:text-slate-500
            "
          />

          <label
            htmlFor="task-search"
            className="sr-only"
          >
            Search tasks
          </label>

          <input
            id="task-search"
            type="search"
            value={filters.search ?? ""}
            onChange={(event) =>
              updateFilter(
                "search",
                event.target.value
              )
            }
            placeholder="Search tasks..."
            autoComplete="off"
            className="
              w-full
              rounded-lg
              border border-slate-300
              bg-white
              py-2.5 pl-10 pr-3
              text-sm
              text-slate-900
              placeholder:text-slate-400

              outline-none
              transition-colors

              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="task-status"
            className="sr-only"
          >
            Filter by status
          </label>

          <select
            id="task-status"
            value={filters.status ?? ""}
            onChange={(event) =>
              updateFilter(
                "status",
                event.target.value
                  ? (event.target.value as TaskStatus)
                  : undefined
              )
            }
            className="
              w-full
              rounded-lg
              border border-slate-300
              bg-white
              px-3 py-2.5
              text-sm
              text-slate-700

              outline-none
              transition-colors

              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          >
            <option value="">All Statuses</option>

            {STATUS_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="task-priority"
            className="sr-only"
          >
            Filter by priority
          </label>

          <select
            id="task-priority"
            value={filters.priority ?? ""}
            onChange={(event) =>
              updateFilter(
                "priority",
                event.target.value
                  ? (event.target.value as TaskPriority)
                  : undefined
              )
            }
            className="
              w-full
              rounded-lg
              border border-slate-300
              bg-white
              px-3 py-2.5
              text-sm
              text-slate-700

              outline-none
              transition-colors

              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          >
            <option value="">
              All Priorities
            </option>

            {PRIORITY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date From */}
        <div>
          <label
            htmlFor="task-due-date-from"
            className="sr-only"
          >
            Due date from
          </label>

          <input
            id="task-due-date-from"
            type="date"
            value={filters.dueDateFrom ?? ""}
            onChange={(event) =>
              updateFilter(
                "dueDateFrom",
                event.target.value || undefined
              )
            }
            className="
              w-full
              rounded-lg
              border border-slate-300
              bg-white
              px-3 py-2.5
              text-sm
              text-slate-700

              outline-none
              transition-colors

              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          />
        </div>

        {/* Due Date To */}
        <div>
          <label
            htmlFor="task-due-date-to"
            className="sr-only"
          >
            Due date to
          </label>

          <input
            id="task-due-date-to"
            type="date"
            value={filters.dueDateTo ?? ""}
            min={filters.dueDateFrom ?? undefined}
            onChange={(event) =>
              updateFilter(
                "dueDateTo",
                event.target.value || undefined
              )
            }
            className="
              w-full
              rounded-lg
              border border-slate-300
              bg-white
              px-3 py-2.5
              text-sm
              text-slate-700

              outline-none
              transition-colors

              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:focus:border-slate-500
              dark:focus:ring-slate-700
            "
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-md
              px-2 py-1
              text-sm
              font-medium
              text-slate-500
              transition-colors

              hover:bg-slate-100
              hover:text-slate-900

              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
              focus:ring-offset-2

              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-slate-100
              dark:focus:ring-slate-600
              dark:focus:ring-offset-slate-900
            "
          >
            <X
              size={15}
              aria-hidden="true"
            />

            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

export default TaskFilters;