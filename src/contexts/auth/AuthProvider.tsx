import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiLogin } from "../../services/auth/apiLogin";
import { useNavigate } from "react-router";
import { apiRegister } from "../../services/auth/apiRegister";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  async function login(
    email: string,
    password: string,
  ): Promise<void | { message: string }> {
    const result = await apiLogin(email, password);

    if (result.ok === true) {
      setUserId(result.userId);
      setIsLoggedIn(true);
      // This isLoading flag might be weird.
      setIsLoading(false);
      return navigate("/dashboard");
    } else {
      return { message: result.message };
    }
  }

  async function register(email: string, firstName: string, password: string) {
    const result = await apiRegister(email, firstName, password);

    if (result.ok === true) {
      setUserId(result.userId);
      setFirstName(result.firstName);
      setIsLoggedIn(true);
      // This isLoading flag might be weird.
      setIsLoading(false);
      return navigate("/dashboard");
    } else {
      return { error: result.error };
    }
  }

  async function logout() {
    //TODO: Write this.
  }

  const value = {
    isLoggedIn,
    isLoading,
    userId,
    firstName,
    login,
    register,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
