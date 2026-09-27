import { useNavigate } from "react-router-dom";
import { useOrganizations } from "../../hooks/organization/useOrganizations";
import { useCurrentOrganization } from "../../hooks/organization/useCurrentOrganization";

const Organizations = () => {
  const navigate = useNavigate();

  const {
    data: organizations,
    isPending,
    isError,
    refetch,
  } = useOrganizations();

  const { selectOrganization } = useCurrentOrganization();

  const handleSelect = (
    organization: NonNullable<typeof organizations>[number]
  ) => {
    selectOrganization({
      id: organization.id,
      name: organization.name,

      /*
       * Role will come from the user's
       * membership response.
       *
       * If your GET /organizations response
       * already includes role, use it directly.
       */
      role: organization.role,
    });

    navigate(`/organizations/${organization.id}`, {
      replace: true,
    });
  };

  if (isPending) {
    return <div className="p-6">Loading organizations...</div>;
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Unable to load organizations.</p>

          <button
            onClick={() => refetch()}
            className="mt-3 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!organizations?.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-slate-900">
            No organizations found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You are not currently a member of any organization.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Your organizations
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Select an organization to continue.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((organization) => (
            <button
              key={organization.id}
              type="button"
              onClick={() => handleSelect(organization)}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 font-semibold text-indigo-600">
                  {organization.name.charAt(0).toUpperCase()}
                </div>

                <span className="text-slate-400 transition group-hover:text-indigo-600">
                  →
                </span>
              </div>

              <h2 className="mt-5 font-semibold text-slate-900">
                {organization.name}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Organizations;
