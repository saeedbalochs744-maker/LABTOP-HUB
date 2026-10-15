import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // send to sign in and remember the page they wanted
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  return children;
}
