import { Navigate, Outlet, useParams } from "react-router-dom";
import { useCurrentOrganization } from "../hooks/organization/useCurrentOrganization";

const OrganizationRoute = () => {
  const { organizationId: currentOrganizationId } = useCurrentOrganization();

  const { organizationId: routeOrganizationId } = useParams<{
    organizationId: string;
  }>();

  if (!currentOrganizationId) {
    return <Navigate to="/organizations" replace />;
  }

  if (routeOrganizationId !== currentOrganizationId) {
    return <Navigate to={`/organizations/${currentOrganizationId}`} replace />;
  }

  return <Outlet />;
};

export default OrganizationRoute;
