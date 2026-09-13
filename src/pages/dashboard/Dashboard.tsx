import { useAppSelector } from "../../redux/hooks";
import type { InfoItemProps, StatCardProps } from "../../utils/types/dashboard";
import { ORG_ROLES } from "../../utils/types/role";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = useAppSelector((state) => state.organization.role);
  const isOrgAdmin = role === ORG_ROLES.ORG_ADMIN;
  const displayRole = role?.replaceAll("_", " ") || "member";

  return (
    <main>
      {" "}
      {/* Header */}{" "}
      <section className="mb-8">
        {" "}
        <h1 className="text-2xl font-bold text-slate-900">
          {" "}
          Welcome back, {user?.name || "User"} 👋{" "}
        </h1>{" "}
        <p className="mt-1 text-sm text-slate-500">
          {" "}
          Here's what's happening in your workspace.{" "}
        </p>{" "}
      </section>{" "}
      {/* Stats */}{" "}
      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {" "}
        <StatCard label="Total Projects" value={0} />{" "}
        <StatCard label="Total Tasks" value={0} />{" "}
        <StatCard label="In Progress" value={0} />{" "}
        <StatCard label="Completed" value={0} />{" "}
      </section>{" "}
      {/* Workspace Information */}{" "}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        {" "}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {" "}
          <div>
            {" "}
            <h2 className="text-lg font-semibold text-slate-900">
              {" "}
              Workspace Information{" "}
            </h2>{" "}
            <p className="mt-1 text-sm text-slate-500">
              {" "}
              Your account and workspace details.{" "}
            </p>{" "}
          </div>{" "}
          {isOrgAdmin && (
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {" "}
              Organization Admin{" "}
            </span>
          )}{" "}
        </div>{" "}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {" "}
          <InfoItem label="Email" value={user?.email || "-"} />{" "}
          <InfoItem label="Role" value={displayRole} capitalize />{" "}
        </div>{" "}
      </section>{" "}
    </main>
  );
};

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      {" "}
      <p className="text-sm text-slate-500"> {label} </p>{" "}
      <p className="mt-2 text-3xl font-bold text-slate-900"> {value} </p>{" "}
    </article>
  );
};

const InfoItem = ({
  label,
  value,
  mono = false,
  capitalize = false,
}: InfoItemProps) => {
  return (
    <div className="min-w-0">
      {" "}
      <p className="text-sm text-slate-500"> {label} </p>{" "}
      <p
        title={value}
        className={[
          "mt-1 text-slate-900",
          "font-medium",
          mono ? "truncate font-mono text-sm" : "break-words",
          capitalize ? "capitalize" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {" "}
        {value}{" "}
      </p>{" "}
    </div>
  );
};
export default Dashboard;
