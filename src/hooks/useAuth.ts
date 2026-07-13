import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  return value;
}
