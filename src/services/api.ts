import axios from "axios";
import ICustomAxiosRequestConfig from "../lib/getProductsList";
import { clearToken, getToken } from "../utils/auth";
import notification from "../utils/notification";
import Cookies from "js-cookie";
import Router from "next/router";

const url = process.env.NEXT_PUBLIC_APP_PLATAZ_URL;

const api = axios.create({
  baseURL: url,
  timeout: 100000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          notification(error.response.data.message, "error");

          break;

        case 401:
          Cookies.remove("token");

          notification(error.response.data.error, "error");

          const path = Router.pathname;

          if (path !== "/login") {
            Router.push(
              { pathname: "/login", query: { prevPath: "/" } },
              "/login"
            );
          }

          break;

        case 408:
          notification(error.response.data.message, "error");

          /*     history.push("/"); */

          break;

        case 500:
          notification(error.response.data.message, "error");

          break;

        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config: ICustomAxiosRequestConfig) => {
  if (!config.serverSide) {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
