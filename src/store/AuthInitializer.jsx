// src/store/AuthInitializer.jsx
"use client";
import { useMeQuery } from "@/store/slices/authApi";
import { useDispatch } from "react-redux";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";
import { useEffect } from "react";

/**
 * Invisible initializer that runs once on app load.
 * It triggers the `me` query and syncs user into Redux (without clearing token unless 401).
 */
export default function AuthInitializer() {
  const { data, error } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.user && data?.token) {
      // only set user (do not clear or overwrite token)
      dispatch(setCredentials({ user: data.user, token: data.token }));
    } else if (error?.status === 401) {
      dispatch(clearCredentials());
    }
  }, [data, error, dispatch]);

  return null;
}
