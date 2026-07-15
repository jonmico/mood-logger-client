import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedLayout() {
  const { isLoading } = useAuth();
  return <div>{isLoading ? <div>Loading...</div> : <Outlet />}</div>;
}
