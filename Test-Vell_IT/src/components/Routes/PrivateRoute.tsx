import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return !isAuth ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;