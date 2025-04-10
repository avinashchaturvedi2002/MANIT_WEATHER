import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const name = sessionStorage.getItem("name");

  if (!name) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
