import { createContext, useState } from "react";

interface IntAuthContext {
	isLoggedIn: boolean;
	isLoading: boolean;
	userId: string;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<IntAuthContext | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userId, setUserId] = useState("");

	async function login(email: string, password: string) {
		//TODO: Write this.
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
