"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { useRouter } from "next/navigation";

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  loading: boolean;
  otpRequired: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleIds: number[];
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpRequired, setOtpRequired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("jwtToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(`/auth/signin?email=${email}&password=${password}`);
      const { otpRequired: isOtpRequired } = response.data;
      setOtpRequired(isOtpRequired);
      if (!isOtpRequired) {
        const { token: newToken } = response.data;
        localStorage.setItem("jwtToken", newToken);
        const decoded = jwtDecode<DecodedToken>(newToken);
        setUser(decoded);
        setToken(newToken);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const response = await api.post(`/auth/verify-otp/${email}/${otp}`);
      const { message, token: newToken } = response.data;

      if (message === "OTP verified successfully") {
        localStorage.setItem("jwtToken", newToken);
        const decoded = jwtDecode<DecodedToken>(newToken);
        setUser(decoded);
        setToken(newToken);
        setOtpRequired(false);
        router.push("/dashboard");
      } else {
        throw new Error("OTP verification failed.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleIds: number[];
  }) => {
    try {
      const response = await api.post("/auth/signup", data);
      const { token: newToken } = response.data;
      localStorage.setItem("jwtToken", newToken);
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUser(decoded);
      setToken(newToken);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    setToken(null);
    setOtpRequired(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, otpRequired, login, verifyOtp, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
