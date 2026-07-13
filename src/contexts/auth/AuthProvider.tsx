import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiLogin } from "../../services/auth/apiLogin";
import { useNavigate } from "react-router";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    const loginData = await apiLogin(email, password);

    if (loginData.ok) {
      setUserId(loginData.data.userId);
      return navigate("/dashboard");
    }
  }

  async function register(email: string, password: string) {
    //TODO: Write this.
  }

  async function logout() {
    //TODO: Write this.
  }

  const value = { isLoggedIn, isLoading, userId, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
