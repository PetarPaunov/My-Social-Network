import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export const RauteGuard = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user.email) {
    return <Navigate to={"/"} />;
  }

  return children ? children : <Outlet />;
};
