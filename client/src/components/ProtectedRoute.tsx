import { useAppSelector } from "@/store/hooks";
import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "@/components/Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.user.data);
  const isInitializing = useAppSelector((state) => state.user.isInitializing);
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
