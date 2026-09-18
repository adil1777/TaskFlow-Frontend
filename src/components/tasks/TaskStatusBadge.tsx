import type { TaskStatus } from "../../utils/types/task";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

interface StatusConfig {
  label: string;
  className: string;
}

const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
  todo: {
    label: "Todo",
    className:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  in_progress: {
    label: "In Progress",
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  review: {
    label: "Review",
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400",
  },
  done: {
    label: "Done",
    className:
      "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
  },
};

const FALLBACK_CONFIG: StatusConfig = {
  label: "Unknown",
  className:
    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const config = STATUS_CONFIG[status] ?? FALLBACK_CONFIG;

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-1
        text-xs font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

export default TaskStatusBadge;
