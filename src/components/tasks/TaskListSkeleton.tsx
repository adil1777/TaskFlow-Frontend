const TaskListSkeleton = () => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white

        dark:border-slate-800
        dark:bg-slate-900
      "
      aria-label="Loading tasks"
    >
      {/* Table Header */}

      <div
        className="
          hidden
          border-b
          border-slate-200
          bg-slate-50
          px-5 py-4

          md:grid
          md:grid-cols-5
          md:gap-4

          dark:border-slate-800
          dark:bg-slate-800/60
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-3
              animate-pulse
              rounded
              bg-slate-200

              dark:bg-slate-700
            "
          />
        ))}
      </div>

      {/* Table Rows */}

      <div
        className="
          divide-y
          divide-slate-100

          dark:divide-slate-800
        "
      >
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="
              grid
              gap-4
              px-5 py-5

              md:grid-cols-5
              md:items-center
            "
          >
            {/* Task */}

            <div className="space-y-2">
              <div
                className="
                  h-4
                  w-36
                  animate-pulse
                  rounded
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded
                  bg-slate-100

                  dark:bg-slate-800
                "
              />
            </div>

            {/* Status */}

            <div
              className="
                h-6
                w-20
                animate-pulse
                rounded-full
                bg-slate-200

                dark:bg-slate-800
              "
            />

            {/* Priority */}

            <div
              className="
                h-6
                w-16
                animate-pulse
                rounded-full
                bg-slate-200

                dark:bg-slate-800
              "
            />

            {/* Assignee */}

            <div className="flex items-center gap-2">
              <div
                className="
                  h-8
                  w-8
                  animate-pulse
                  rounded-full
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              <div
                className="
                  h-4
                  w-20
                  animate-pulse
                  rounded
                  bg-slate-200

                  dark:bg-slate-800
                "
              />
            </div>

            {/* Due Date */}

            <div
              className="
                h-4
                w-24
                animate-pulse
                rounded
                bg-slate-200

                dark:bg-slate-800
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListSkeleton;