"use client";

import { useMeQuery } from "@/store/slices/authApi";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/slices/authSlice";
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
      dispatch(setUser(data.user));
    } else if (error) {
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  return null; // invisible helper component
}
