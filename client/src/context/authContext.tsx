import { Navigate, Outlet } from "react-router-dom"; 
import { useContext } from "react";
import { UserContext } from "./useContext";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  if (user.isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (user.isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute