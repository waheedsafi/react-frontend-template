import { create } from "zustand";
import axiosClient from "@/lib/axois-client";
import {
  getConfiguration,
  removeToken,
  returnPermissionsMap,
  setToken,
} from "@/lib/utils";
import type { User } from "@/database/models";

type AuthUser = User;

interface AuthStore {
  user: AuthUser;
  authenticated: boolean;
  token?: string;
  loading: boolean;
  loginUser: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<any>;
  logoutUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
  loadUser: () => Promise<void>;
}

// Shared init user
const initUser: AuthUser = {
  id: "",
  full_name: "",
  username: "",
  email: "",
  profile: "",
  role: { role: 1, name: "super" },
  job: "",
  contact: "",
  division: "",
  created_at: "",
  gender: "",
  permissions: new Map(),
  registration_number: "",
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: initUser,
  authenticated: false,
  loading: true,

  loginUser: async (email, password, rememberMe) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axiosClient.post("auth-user", formData);
      if (response.status === 200) {
        const user = response.data.user as User;
        user.permissions = returnPermissionsMap(response.data?.permissions);

        if (rememberMe) {
          setToken({ type: "user" });
        }

        set({
          user,
          authenticated: true,
          loading: false,
          token: response.data?.access_token,
        });
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  logoutUser: async () => {
    try {
      await axiosClient.post("auth-logout");
    } catch (error) {
      console.error(error);
    }
    removeToken();
    set({ user: initUser, authenticated: false, loading: false });
  },

  setUser: (user: AuthUser) => {
    set({ user });
  },

  loadUser: async () => {
    const config = getConfiguration();

    const type = config?.type ? config?.type : "user";
    try {
      const response = await axiosClient.get(`auth-${type}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const user = response.data.user;
        user.permissions = returnPermissionsMap(response.data?.permissions);
        set({
          user,
          authenticated: true,
          loading: false,
          token: response.data?.access_token,
        });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error(error);
      removeToken();
      set({ user: initUser, authenticated: false, loading: false });
    }
  },
}));
