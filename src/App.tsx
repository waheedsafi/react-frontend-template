import { RoleEnum } from "@/database/model-enums";
import { getGuestRouter, getSuperRouter } from "./routes/routes";
import { useGeneralAuthState } from "@/stores/auth/use-auth-store";

export default function App() {
  const { user, loading, authenticated } = useGeneralAuthState();

  if (loading) return;
  let routes = null;
  if (!authenticated) routes = getGuestRouter();
  else {
    routes =
      user.role.role == RoleEnum.super
        ? getSuperRouter(user, authenticated)
        : getGuestRouter();
  }
  return routes;
}
