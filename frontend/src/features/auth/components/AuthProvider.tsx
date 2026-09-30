import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getCurrentUser } from "../api/authApi";
import { useAuthStore } from "../../../store/authStore";

interface AuthContextValue {
  isLoading: boolean;
}

const AuthContext =
  createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await getCurrentUser();

        setUser(response.data.user);
      } catch {
        clearUser();
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, [setUser, clearUser]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}
