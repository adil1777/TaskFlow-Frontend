import { CheckCircle2, Circle, Clock3, ListTodo } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useProjectDashboard } from "../../hooks/useDashboard";

import TaskStatusCard from "../../components/dashboard/TaskStatusCard";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";
import DashboardError from "../../components/dashboard/DashboardError";

const Dashboard = () => {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const { data, isLoading, isError, refetch } = useProjectDashboard(
    projectId ?? ""
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <DashboardError onRetry={() => refetch()} />
      </div>
    );
  }

  const { total, counts } = data.data;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Project Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of tasks and their current status.
        </p>
      </div>

      {/* Total Tasks */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Tasks
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
              {total}
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Tasks in this project
            </p>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 sm:flex">
            <ListTodo size={28} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TaskStatusCard
          title="Todo"
          value={counts.todo}
          icon={Circle}
          description="Tasks waiting to be started"
        />

        <TaskStatusCard
          title="In Progress"
          value={counts.in_progress}
          icon={Clock3}
          description="Tasks currently being worked on"
        />

        <TaskStatusCard
          title="Review"
          value={counts.review}
          icon={ListTodo}
          description="Tasks waiting for review"
        />

        <TaskStatusCard
          title="Done"
          value={counts.done}
          icon={CheckCircle2}
          description="Completed tasks"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Quickly navigate to commonly used project areas.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}`)}
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            View Project
          </button>

          <button
            type="button"
            onClick={() => navigate(`/projects/${projectId}/tasks`)}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
          >
            Manage Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
