import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiLogin } from "../../services/auth/apiLogin";
import { useNavigate } from "react-router";
import { apiRegister } from "../../services/auth/apiRegister";
import { apiMe } from "../../services/auth/apiMe";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const meData = await apiMe();

      if (meData.ok === false) {
        console.log(meData.error);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      setIsLoading(false);
      setUserId(meData.data.userId);
      setFirstName(meData.data.firstName);
      setEmail(meData.data.email);
    }
    checkAuth();
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<void | { error: string }> {
    const result = await apiLogin(email, password);

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
    email,
    login,
    register,
    logout,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}
