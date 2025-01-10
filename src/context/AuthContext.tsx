/* eslint-disable react-hooks/exhaustive-deps */
import { useVerifyUser } from "@/services/queries/useAuth";
import { useGlobalStore } from "@/stores/state";
import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isLoggedIn } = useGlobalStore();
  const { refetch } = useVerifyUser();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn]);

  const value: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
