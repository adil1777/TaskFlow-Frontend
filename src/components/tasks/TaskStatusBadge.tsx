import type { TaskStatus } from "../../utils/types/task";

interface Props {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  todo: {
    label: "Todo",
    className:
      "bg-slate-100 text-slate-700",
  },

  in_progress: {
    label: "In Progress",
    className:
      "bg-blue-50 text-blue-700",
  },

  review: {
    label: "Review",
    className:
      "bg-yellow-50 text-yellow-700",
  },

  done: {
    label: "Done",
    className:
      "bg-green-50 text-green-700",
  },
};

const TaskStatusBadge = ({
  status,
}: Props) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default TaskStatusBadge;