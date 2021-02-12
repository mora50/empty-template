import axios from "axios";
import ICustomAxiosRequestConfig from "../lib/getProductsList";
import notification from "../utils/notification";
import Cookies from "js-cookie";
import Router from "next/router";

const url = process.env.NEXT_PUBLIC_APP_PLATAZ_URL + "/api";

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
      const errorMessage =
        error.response.data.message ?? error.response.data.error;

      console.log(errorMessage);

      switch (error.response.status) {
        case 400:
          notification(errorMessage, "error");

          break;

        case 401:
          Cookies.remove("token");

          notification(errorMessage, "error");

          const path = Router.pathname;

          if (path !== "/login") {
            Router.push(
              { pathname: "/login", query: { prevPath: "/" } },
              "/login"
            );
          }

          break;

        case 408:
          notification(errorMessage, "error");

          /*     history.push("/"); */

          break;

        case 500:
          notification(errorMessage, "error");

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
