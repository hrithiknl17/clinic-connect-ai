import { createContext, useContext, useState, ReactNode } from "react";

interface DemoUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: DemoUser | null;
  loading: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const saved = localStorage.getItem("demo_user");
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = (email: string) => {
    const demoUser = { id: "demo-1", email };
    setUser(demoUser);
    localStorage.setItem("demo_user", JSON.stringify(demoUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("demo_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
