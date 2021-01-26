import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import notification from "@utils/notification";

export interface State {
  isAutheticated: boolean;
  login: () => void;
}

declare global {
  interface Date {
    addHours: Function;
  }
}

interface Logout {
  data: {
    message: string;
  };
}

export const AuthContext = createContext<State | any>({});

export const AuthProvider: FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(null);

  const token = Cookies.get("token");

  const router = useRouter();

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

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

        setAuthenticated(true);
      }
    } finally {
      return false;
    }
  };

  const logout = async () => {
    try {
      const response: Logout = await api.get("/customer/logout");

      setAuthenticated(false);
      router.push("/login");
      Cookies.remove("token");

      notification(response.data.message, "success");
      delete api.defaults.headers.Authorization;
    } finally {
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: authenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const token = Cookies.get("token");

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
