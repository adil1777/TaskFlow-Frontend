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
   * TaskAssignee.id      -> assignment ID
   * TaskAssignee.userId  -> assigned user's ID
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
      {/* Assigned Users */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <UserRound size={17} className="text-slate-600" aria-hidden="true" />

          <h3 className="text-sm font-semibold text-slate-800">
            Assigned Members
          </h3>
        </div>

        {assignedUsers.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
            <p className="text-sm text-slate-500">
              No members assigned to this task.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {assignedUsers.map((assignment) => {
              const user = assignment.user;

              return (
                <div
                  key={assignment.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                >
                  {/* Avatar */}
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700"
                    aria-hidden="true"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Information */}
                  <div className="min-w-0">
                    <p
                      title={user.name}
                      className="max-w-[180px] truncate text-sm font-medium text-slate-800"
                    >
                      {user.name}
                    </p>

                    <p
                      title={user.email}
                      className="max-w-[220px] truncate text-xs text-slate-500"
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
                    className="ml-1 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
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
          <UserRoundPlus
            size={17}
            className="text-slate-600"
            aria-hidden="true"
          />

          <h3 className="text-sm font-semibold text-slate-800">
            Assign Member
          </h3>
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
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
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
            <p className="mt-2 text-xs text-slate-500">
              All available organization members are already assigned.
            </p>
          )}
      </div>
    </div>
  );
};

export default TaskAssignment;
