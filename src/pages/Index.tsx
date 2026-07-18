import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Index() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <div>This is the index page.</div>
      <div>
        <Link to={"/dashboard"}>Here is a link to the dashboard.</Link>
      </div>
    </div>
  );
}
