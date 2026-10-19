import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

// "/api" is forwarded to http://localhost:5000 by the proxy in vite.config.js
const API_URI = import.meta.env.VITE_APP_BASE_URL
  ? `${import.meta.env.VITE_APP_BASE_URL}/api`
  : "/api";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include", // send the login cookie with every request
});

// If the server says "not authorized" (cookie expired), log the user out
const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === "string" ? args : args?.url;
  if (result?.error?.status === 401 && url !== "/user/login") {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Task", "Tasks", "Users", "Notifications", "Dashboard"],
  endpoints: () => ({}),
});
