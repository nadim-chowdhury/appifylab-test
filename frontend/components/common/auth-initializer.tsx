"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyValidateTokenQuery } from "@/store/services/authService";
import { setCredentials, logout } from "@/store/slices/authSlice";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [validateToken] = useLazyValidateTokenQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Validate token on app load
      validateToken()
        .unwrap()
        .then((user: any) => {
          dispatch(setCredentials({ user, token }));
        })
        .catch(() => {
          // Token is invalid, clear auth state
          dispatch(logout());
        });
    }
  }, [dispatch, validateToken]);

  return <>{children}</>;
}
