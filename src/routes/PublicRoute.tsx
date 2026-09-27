import {
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuthenticated } from "../features/auth/auth.selectors";


const PublicRoute = () => {
  const isAuthenticated =
    useAppSelector(
      selectIsAuthenticated
    );

  if (isAuthenticated) {
    return (
      <Navigate
        to="/organizations"
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;