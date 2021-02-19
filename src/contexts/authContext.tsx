import { useRouter } from "next/router";
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import api from "../services/api";
import notification from "@utils/notification";

export interface State {
  isAutheticated: boolean;
  login: () => void;
}

declare global {
  interface Date {
    // eslint-disable-next-line @typescript-eslint/ban-types
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
    setAuthenticated(token ? true : false);
  }, [token]);

  const login = useCallback(
    async (email: string, password: string, redirect?: string) => {
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
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      const response: Logout = await api.get("/customer/logout");

      setAuthenticated(false);
      router.push("/login");
      Cookies.remove("token");

      notification(response.data.message, "success");
      delete api.defaults.headers.Authorization;
    } finally {
    }
  }, [router]);

  const value = useMemo(
    () => ({
      isAuthenticated: authenticated,
      login,
      logout,
    }),
    [authenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const ProtectRoute: FC<{ children?: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  const token = Cookies.get("token");

  const router = useRouter();

  const path = router.pathname;

  const protectedRoutes = ["profile"] as const;

  const isProtected = (path as any).includes(protectedRoutes);

  useEffect(() => {
    if (!token && isProtected) {
      login("vitor.piaia@seoze.com", "123456");

      /*  router.push("/login"); */
    }

    if (token && router.pathname === "/login") {
      router.push("/profile");
    }
  }, [isAuthenticated, isProtected, login, router, token]);

  return children;
};

export default ProtectRoute;
