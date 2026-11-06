import { createContext } from "react";
import type { User } from "../types/auth";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
}

// `undefined` means "no AuthProvider above this component".
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
