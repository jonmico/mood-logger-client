import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function ProtectedLayout() {
  const { isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoading, isLoggedIn, navigate]);

  return <div>{isLoading ? <div>Loading...</div> : <Outlet />}</div>;
}
