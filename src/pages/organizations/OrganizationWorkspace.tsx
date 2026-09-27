import PageContainer from "../../components/layout/PageContainer";
import { useCurrentOrganization } from "../../hooks/organization/useCurrentOrganization";

const OrganizationWorkspace = () => {
  const { organization } = useCurrentOrganization();

  return (
    <PageContainer>
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Organization</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {organization.name}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Welcome to your organization workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Projects</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Tasks</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Members</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">—</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Role</p>

          <p className="mt-2 text-lg font-bold capitalize text-slate-900">
            {organization.role?.replace("_", " ") ?? "—"}
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default OrganizationWorkspace;
