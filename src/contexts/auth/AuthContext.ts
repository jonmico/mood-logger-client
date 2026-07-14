import { createContext } from "react";

interface IntAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string;
  login: (
    email: string,
    password: string,
  ) => Promise<void | { message: string }>;
  register: (
    email: string,
    password: string,
  ) => Promise<void | { error: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IntAuthContext | null>(null);
