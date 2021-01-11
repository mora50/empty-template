import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";

export interface State {
  isAutheticated: boolean;
  login: () => void;
}

declare global {
  interface Date {
    addHours: Function;
  }
}

export const AuthContext = createContext<State | any>({});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const login = async (email: string, password: string, redirect?: string) => {
    try {
      const { data: response } = await api.post("/customer/login", {
        email,
        password,
      });

      const token = response.token;

      if (token) {
        Date.prototype.addHours = function (h: number) {
          this.setHours(this.getHours() + h);
          return this;
        };

        const todayWithHours = new Date().addHours(1);

        Cookies.set("token", token, {
          expires: todayWithHours,
        });

        router.push(redirect);

        setUser(true);
      }
    } finally {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    router.push("/login");
    Cookies.remove("token");

    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
  const token = Cookies.get("token");

  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const path = router.pathname;

  const protectedRoutes = ["profile"] as const;

  const isProtected = (path as any).includes(protectedRoutes);

  useEffect(() => {
    if (!token && isProtected) {
      router.push("/login");
    }

    if (token && router.pathname === "/login") {
      router.push("/profile");
    }
  }, [isAuthenticated, router.pathname]);

  return children;
};

export default ProtectRoute;
