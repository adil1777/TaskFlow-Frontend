const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role");

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening in your workspace.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Total Projects
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            0
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            0
          </h2>
        </div>
      </div>

      {/* Workspace Info */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Workspace Information
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="mt-1 font-medium text-slate-900">
              {user?.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Role
            </p>

            <p className="mt-1 font-medium capitalize text-slate-900">
              {role?.replace("_", " ") || "member"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;