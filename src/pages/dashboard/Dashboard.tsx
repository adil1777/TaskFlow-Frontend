import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, role, organizationId } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">Welcome back, {user?.name}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">User</p>

            <p className="mt-2 font-semibold">{user?.email}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Role</p>

            <p className="mt-2 font-semibold capitalize">
              {role?.replace("_", " ")}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Organization</p>

            <p className="mt-2 break-all font-semibold">{organizationId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
