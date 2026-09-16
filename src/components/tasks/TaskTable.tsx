import { CalendarDays, MoreHorizontal, UserRound } from "lucide-react";

import type { Task } from "../../utils/types/task";

import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";

interface TaskTableProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const TaskTable = ({ tasks, onTaskClick }: TaskTableProps) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          {/* Table Header */}
          <thead>
            <tr
              className="
                border-b border-slate-200
                bg-slate-50
                dark:border-slate-800
                dark:bg-slate-800/60
              "
            >
              <th
                scope="col"
                className="
                  px-5 py-3
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Task
              </th>

              <th
                scope="col"
                className="
                  px-5 py-3
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Status
              </th>

              <th
                scope="col"
                className="
                  px-5 py-3
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Priority
              </th>

              <th
                scope="col"
                className="
                  px-5 py-3
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Assignee
              </th>

              <th
                scope="col"
                className="
                  px-5 py-3
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Due Date
              </th>

              <th
                scope="col"
                className="
                  px-5 py-3
                  text-right
                  text-xs font-semibold
                  uppercase tracking-wide
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody
            className="
              divide-y divide-slate-100
              dark:divide-slate-800
            "
          >
            {tasks.map((task) => {
              const assignee = task.assignments?.[0];

              return (
                <tr
                  key={task.id}
                  onClick={() => onTaskClick(task.id)}
                  className="
                    cursor-pointer
                    transition-colors
                    hover:bg-slate-50
                    dark:hover:bg-slate-800/50
                  "
                >
                  {/* Task */}
                  <td className="px-5 py-4">
                    <div className="min-w-0">
                      <p
                        title={task.title}
                        className="
                          max-w-[280px]
                          truncate
                          text-sm font-medium
                          text-slate-900
                          dark:text-slate-100
                        "
                      >
                        {task.title}
                      </p>

                      {task.description && (
                        <p
                          title={task.description}
                          className="
                            mt-1
                            max-w-[280px]
                            truncate
                            text-xs
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <TaskStatusBadge status={task.status} />
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-4">
                    <TaskPriorityBadge priority={task.priority} />
                  </td>

                  {/* Assignee */}
                  <td className="px-5 py-4">
                    {assignee ? (
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-8 w-8
                            shrink-0
                            items-center justify-center
                            rounded-full
                            bg-slate-100
                            dark:bg-slate-800
                          "
                          aria-hidden="true"
                        >
                          <UserRound
                            size={15}
                            className="
                              text-slate-600
                              dark:text-slate-400
                            "
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            title={assignee.name}
                            className="
                              max-w-[180px]
                              truncate
                              text-sm font-medium
                              text-slate-800
                              dark:text-slate-200
                            "
                          >
                            {assignee.name}
                          </p>

                          <p
                            title={assignee.email}
                            className="
                              max-w-[180px]
                              truncate
                              text-xs
                              text-slate-500
                              dark:text-slate-400
                            "
                          >
                            {assignee.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span
                        className="
                          text-sm
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Due Date */}
                  <td className="px-5 py-4">
                    {task.dueDate ? (
                      <div
                        className="
                          flex items-center gap-2
                          text-sm
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        <CalendarDays
                          size={15}
                          className="
                            shrink-0
                            text-slate-400
                            dark:text-slate-500
                          "
                          aria-hidden="true"
                        />

                        <span>
                          {new Date(task.dueDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="
                          text-sm
                          text-slate-400
                          dark:text-slate-500
                        "
                      >
                        No deadline
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`View task ${task.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onTaskClick(task.id);
                      }}
                      className="
                        inline-flex
                        items-center justify-center
                        rounded-lg
                        p-2
                        text-slate-400
                        transition-colors

                        hover:bg-slate-100
                        hover:text-slate-700

                        focus:outline-none
                        focus:ring-2
                        focus:ring-slate-400
                        focus:ring-offset-2

                        dark:text-slate-500
                        dark:hover:bg-slate-800
                        dark:hover:text-slate-200
                        dark:focus:ring-slate-600
                        dark:focus:ring-offset-slate-900
                      "
                    >
                      <MoreHorizontal size={18} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
