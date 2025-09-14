// src/store/baseQueryWithReauth.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // clear redux state
    api.dispatch(clearCredentials());

    // show toast once
    if (!window.__authToastShown) {
      window.__authToastShown = true;
      toast.error("Please sign in");
      setTimeout(() => (window.__authToastShown = false), 3000);
    }
  }

  return result;
};
