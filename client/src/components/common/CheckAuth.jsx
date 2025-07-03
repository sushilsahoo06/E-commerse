
import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, user, childern }) {
  const location = useLocation();
  if (
    //nor registation
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;//user is go to admin view
    } else {
      return <Navigate to="/shop/home" />;//when a normal user
    }
  }
}
