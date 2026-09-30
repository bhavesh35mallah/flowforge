import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { useAuthContext } from "../features/auth/components/AuthProvider";
import LoadingScreen from "../components/common/LoadingScreen";

export default function ProtectedRoute() {
  const user = useAuthStore(
    (state) => state.user
  );

  const { isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
