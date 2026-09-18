import { UserRound, UserRoundPlus, X } from "lucide-react";
import type { ChangeEvent } from "react";

import { useAssignTask, useUnassignTask } from "../../hooks/useTasks";
import { useMembers } from "../../hooks/useMembers";

import type { Task } from "../../utils/types/task";

interface TaskAssignmentProps {
  task: Task;
}

const TaskAssignment = ({ task }: TaskAssignmentProps) => {
  const { data: members = [], isLoading } = useMembers();

  const assignMutation = useAssignTask();
  const unassignMutation = useUnassignTask();

  const assignedUsers = task.assignments ?? [];

  /**
   * Store user IDs, not assignment IDs.
   *
   * TaskAssignee.id     -> assignment ID
   * TaskAssignee.userId -> assigned user's ID
   */
  const assignedUserIds = new Set(
    assignedUsers.map((assignment) => assignment.userId)
  );

  const availableMembers = members.filter(
    (member) => !assignedUserIds.has(member.id)
  );

  const handleAssign = async (event: ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;

    if (!userId) {
      return;
    }

    try {
      await assignMutation.mutateAsync({
        taskId: task.id,
        userId,
      });

      event.target.value = "";
    } catch {
      // Mutation error is handled by React Query.
      // Keep the selected member available for retry.
    }
  };

  const handleUnassign = async (userId: string) => {
    try {
      await unassignMutation.mutateAsync({
        taskId: task.id,
        userId,
      });
    } catch {
      // Mutation error is handled by React Query.
    }
  };

  return (
    <div className="space-y-6">
      {/* Assigned Members */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <UserRound
              size={16}
              className="text-slate-600 dark:text-slate-400"
              aria-hidden="true"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Assigned Members
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              People currently working on this task.
            </p>
          </div>
        </div>

        {assignedUsers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                <UserRound size={17} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  No members assigned
                </p>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Assign a team member below to start working on this task.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {assignedUsers.map((assignment) => {
              const user = assignment.user;

              return (
                <div
                  key={assignment.id}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors dark:border-slate-800 dark:bg-slate-800/60"
                >
                  {/* Avatar */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                    aria-hidden="true"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Information */}
                  <div className="min-w-0">
                    <p
                      title={user.name}
                      className="max-w-[180px] truncate text-sm font-medium text-slate-900 dark:text-white"
                    >
                      {user.name}
                    </p>

                    <p
                      title={user.email}
                      className="max-w-[220px] truncate text-xs text-slate-500 dark:text-slate-400"
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* Unassign */}
                  <button
                    type="button"
                    onClick={() => handleUnassign(assignment.userId)}
                    disabled={unassignMutation.isPending}
                    aria-label={`Unassign ${user.name}`}
                    title="Unassign member"
                    className="ml-1 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-900"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assign Member */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <UserRoundPlus
              size={16}
              className="text-slate-600 dark:text-slate-400"
              aria-hidden="true"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Assign Member
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Add another organization member to this task.
            </p>
          </div>
        </div>

        <select
          defaultValue=""
          onChange={handleAssign}
          disabled={
            isLoading ||
            assignMutation.isPending ||
            availableMembers.length === 0
          }
          aria-label="Assign member to task"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          <option value="">
            {isLoading
              ? "Loading members..."
              : availableMembers.length === 0
                ? "All members assigned"
                : assignMutation.isPending
                  ? "Assigning member..."
                  : "Select member"}
          </option>

          {availableMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} — {member.email}
            </option>
          ))}
        </select>

        {availableMembers.length === 0 &&
          !isLoading &&
          assignedUsers.length > 0 && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              All available organization members are already assigned.
            </p>
          )}
      </div>
    </div>
  );
};

export default TaskAssignment;
