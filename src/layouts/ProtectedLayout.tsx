import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { me } from "../services/auth/me";

export default function ProtectedLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const meData = await me();

      if (!meData.ok) return navigate("/login");

      setIsLoading(false);
    }
    checkAuth();
  }, [navigate]);

  return (
    <div>
      {isLoading ?
        <div>Loading...</div>
      : <Outlet />}
    </div>
  );
}
