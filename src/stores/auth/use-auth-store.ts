import type { User } from "@/database/models";
import { useAuthStore } from "@/stores/auth/auth-store";

export const useUserAuthState = () => {
  const { user, authenticated, loading, loginUser, logoutUser, setUser } =
    useAuthStore();

  return {
    user: user as User,
    authenticated,
    loading,
    loginUser,
    logoutUser,
    setUser,
  };
};

export const useGeneralAuthState = useAuthStore;
