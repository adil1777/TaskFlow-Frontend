import type { TaskPriority } from "../../utils/types/task";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

interface PriorityConfig {
  label: string;
  className: string;
}

const PRIORITY_CONFIG: Record<TaskPriority, PriorityConfig> = {
  low: {
    label: "Low",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  medium: {
    label: "Medium",
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  high: {
    label: "High",
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
};

const FALLBACK_CONFIG: PriorityConfig = {
  label: "Unknown",
  className:
    "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
};

const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
  const config = PRIORITY_CONFIG[priority] ?? FALLBACK_CONFIG;

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

export default TaskPriorityBadge;
