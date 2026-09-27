import {
  Navigate,
  useParams,
} from "react-router-dom";
import { useCurrentOrganization } from "../../hooks/organization/useCurrentOrganization";


const OrganizationWorkspace =
  () => {
    const {
      organizationId: currentId,
    } =
      useCurrentOrganization();

    const {
      organizationId: routeId,
    } = useParams<{
      organizationId: string;
    }>();

    if (
      !routeId ||
      currentId !== routeId
    ) {
      return (
        <Navigate
          to="/organizations"
          replace
        />
      );
    }

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Organization Workspace
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Organization ID: {routeId}
        </p>
      </main>
    );
  };

export default OrganizationWorkspace;