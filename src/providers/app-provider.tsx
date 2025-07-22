import NastranSpinner from "@/components/custom-ui/spinner/NastranSpinner";
import { Toaster } from "@/components/ui/sonner";
import { useDirectionChange } from "@/lib/i18n/use-direction-change";
import { useAuthStore } from "@/stores/auth/auth-store";
import { useEffect } from "react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useDirectionChange();
  const loadUser = useAuthStore((state) => state.loadUser);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    loadUser();
  }, [loadUser]);
  if (loading)
    return (
      <div className="h-screen bg-secondary flex justify-center items-center">
        <NastranSpinner />
      </div>
    );
  return (
    <>
      {children} <Toaster richColors position="bottom-right" />
    </>
  );
}
