import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/user" /> : children;
};

export default PublicRoute;