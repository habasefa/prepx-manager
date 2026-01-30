import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import { ConfirmLoginRequest, LoginCredentials, UserData } from "../types/auth";

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<any>;
  confirmLogin: (request: ConfirmLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        // Ideally verify token or fetch user profile
      }
    };
    checkUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Step 1: Attempt Initial Login
      let response;
      try {
        response = await authService.initialLogin(credentials);
      } catch (error: any) {
        console.log("Login Error Status:", error.response?.status);
        // Handle 409 Conflict: Multiple active sessions
        if (
          error.response?.status === 409 &&
          error.response.data?.confirmation_token
        ) {
          console.log("409 Detected, attempting auto-confirmation...");
          const confirmationToken = error.response.data.confirmation_token;

          // Automatically proceed to Confirm Login
          const confirmResponse = await authService.confirmLogin({
            username: credentials.username,
            password: credentials.password,
            confirmation_token: confirmationToken,
          });

          // Success after confirmation
          console.log("Auto-confirmation successful");
          handleLoginSuccess(confirmResponse);
          return confirmResponse;
        }
        throw error;
      }

      // If Step 1 returned 200 OK
      // Check if we got a confirmation token (implies we need to confirm, but maybe not 409)
      // Or if we got the final token directly (if the API supports that for single sessions)
      if ("token" in response && "user" in response) {
        handleLoginSuccess(response);
        return response;
      }

      if (response.confirmation_token) {
        // If 200 OK but still returns confirmation token (maybe standard flow requires 2 steps?)
        // We auto-confirm here too as per "implicit" requirement
        const confirmResponse = await authService.confirmLogin({
          username: credentials.username,
          password: credentials.password,
          confirmation_token: response.confirmation_token,
        });
        handleLoginSuccess(confirmResponse);
        return confirmResponse;
      }

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async (data: any) => {
    if (data.user && data.token) {
      setUser(data.user);
      await SecureStore.setItemAsync("authToken", data.token.access_token);
      if (data.token.refresh_token) {
        await SecureStore.setItemAsync(
          "refreshToken",
          data.token.refresh_token,
        );
      }
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 0);
    }
  };

  const confirmLogin = async (request: ConfirmLoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.confirmLogin(request);
      setUser(response.user);
      await SecureStore.setItemAsync("authToken", response.token.access_token);
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, confirmLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
