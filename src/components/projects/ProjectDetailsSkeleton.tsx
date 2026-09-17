const ProjectDetailsSkeleton =
  () => {
    return (
      <div className="space-y-6">
        {/* Back Button */}

        <div
          className="
            h-9
            w-36
            animate-pulse
            rounded-lg
            bg-slate-200

            dark:bg-slate-800
          "
        />

        {/* Project Card */}

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
        >
          {/* Project Header */}

          <div className="p-6">
            <div className="flex gap-4">
              {/* Icon */}

              <div
                className="
                  h-14
                  w-14
                  shrink-0
                  animate-pulse
                  rounded-xl
                  bg-slate-200

                  dark:bg-slate-800
                "
              />

              {/* Content */}

              <div className="flex-1">
                <div
                  className="
                    h-7
                    w-64
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />

                <div
                  className="
                    mt-4
                    h-4
                    w-full
                    max-w-2xl
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />

                <div
                  className="
                    mt-2
                    h-4
                    w-3/4
                    max-w-xl
                    animate-pulse
                    rounded
                    bg-slate-200

                    dark:bg-slate-800
                  "
                />
              </div>
            </div>
          </div>

          {/* Metadata */}

          <div
            className="
              grid
              gap-4
              border-t
              border-slate-200
              p-6

              sm:grid-cols-2
              lg:grid-cols-3

              dark:border-slate-800
            "
          >
            {Array.from({
              length: 3,
            }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    h-24
                    animate-pulse
                    rounded-lg
                    bg-slate-100

                    dark:bg-slate-800
                  "
                />
              )
            )}
          </div>
        </div>

        {/* Tasks */}

        <div
          className="
            h-52
            animate-pulse
            rounded-xl
            bg-slate-200

            dark:bg-slate-800
          "
        />
      </div>
    );
  };

export default ProjectDetailsSkeleton;