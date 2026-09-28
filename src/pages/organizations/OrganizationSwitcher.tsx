import { useNavigate } from "react-router-dom";
import { useOrganizations } from "../../hooks/organization/useOrganizations";
import { useCurrentOrganization } from "../../hooks/organization/useCurrentOrganization";

const OrganizationSwitcher = () => {
  const navigate = useNavigate();

  const { data: organizations } = useOrganizations();

  const { organizationId, selectOrganization } = useCurrentOrganization();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;

    const organization = organizations?.find((item) => item.id === id);

    if (!organization) {
      return;
    }

    selectOrganization({
      id: organization.id,
      name: organization.name,
      role: organization.role,
    });

    navigate(`/organizations/${organization.id}`, {
      replace: true,
    });
  };

  return (
    <div className="w-full max-w-[240px]">
      <label htmlFor="organization-switcher" className="sr-only">
        Current organization
      </label>

      <select
        id="organization-switcher"
        value={organizationId ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      >
        {!organizationId && <option value="">Select organization</option>}

        {organizations?.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrganizationSwitcher;
