import type { LucideIcon } from "lucide-react";

interface TaskStatusCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
}

const TaskStatusCard = ({
  title,
  value,
  icon: Icon,
  description,
}: TaskStatusCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{description}</p>
    </div>
  );
};

export default TaskStatusCard;
