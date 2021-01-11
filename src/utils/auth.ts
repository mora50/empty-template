import api from "../services/api";

export const isAuthenticated = () =>
  localStorage.getItem(process.env.REACT_APP_NAME) !== null;
export const getToken = () => localStorage.getItem(process.env.REACT_APP_NAME);

export const saveToken = (token: string) => {
  localStorage.setItem(process.env.REACT_APP_NAME, token);
};

export const clearToken = () => {
  localStorage.removeItem(process.env.REACT_APP_NAME);
  localStorage.removeItem("name");
  localStorage.removeItem("anonymous");
};

export const tokenTime = async () => {};

export const Logout = async (redirect: string) => {
  await api.get("/customer/logout");

  localStorage.removeItem("name");
  localStorage.removeItem("anonymous");
  localStorage.removeItem(process.env.REACT_APP_NAME);

  /* return redirect && history.push("/login"); */
};
