"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken } = response.data;
      localStorage.setItem("jwtToken", newToken);
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUser(decoded);
      setToken(newToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (data: { email: string; password: string }) => {
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
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
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
