"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TokenService } from "../services/tokenService";
import { useAuth } from "./authContext";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = TokenService.getToken();
    if (!token) {
      router.push("/login"); // Redirect if token is missing
    } else {
      setIsAuthenticated(true); // Token found, allow access
    }
  }, [router, setIsAuthenticated]);

  if (typeof window === "undefined") {
    return <div>Loading...</div>; // Show loading state on server side
  }
  if (!isAuthenticated) {
    return <p>Loading...</p>; // Show loading state while checking
  }

  return <>{children}</>;
};

export default AuthGuard;
