"use client";

import { useMeQuery } from "@/store/slices/authApi";
import { useDispatch } from "react-redux";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";
import { useEffect } from "react";

/**
 * This component runs once on app load.
 * It silently checks if a valid JWT cookie exists
 * and syncs the user profile into Redux.
 */
export default function AuthInitializer() {
  const { data, error } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.user) {
      dispatch(setCredentials({ user: data.user, token: data.token }));
    } else if (error?.status === 401) {
      dispatch(clearCredentials());
    }
  }, [data, error, dispatch]);

  return null; // invisible helper component
}
