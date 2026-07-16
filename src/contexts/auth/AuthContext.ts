import { createContext } from "react";

interface IntAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string;
  firstName: string;
  email: string;
  login: (email: string, password: string) => Promise<void | { error: string }>;
  register: (
    email: string,
    firstName: string,
    password: string,
  ) => Promise<void | { error: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IntAuthContext | null>(null);
