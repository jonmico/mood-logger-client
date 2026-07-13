import { createContext } from "react";

interface IntAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IntAuthContext | null>(null);
