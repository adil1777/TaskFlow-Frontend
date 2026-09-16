import type { TaskPriority } from "../../utils/types/task";

interface Props {
  priority: TaskPriority;
}

const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    className: string;
  }
> = {
  low: {
    label: "Low",
    className:
      "bg-slate-100 text-slate-600",
  },

  medium: {
    label: "Medium",
    className:
      "bg-blue-50 text-blue-600",
  },

  high: {
    label: "High",
    className:
      "bg-orange-50 text-orange-600",
  },

  urgent: {
    label: "Urgent",
    className:
      "bg-red-50 text-red-600",
  },
};

const TaskPriorityBadge = ({
  priority,
}: Props) => {
  const config = priorityConfig[priority];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default TaskPriorityBadge;