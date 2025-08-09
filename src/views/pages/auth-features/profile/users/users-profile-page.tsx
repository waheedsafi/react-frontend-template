import { useTranslation } from "react-i18next";
import EditProfileInformation from "./steps/edit-profile-information";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, KeyRound } from "lucide-react";

import UserProfileHeader from "./user-profile-header";
import { EditProfilePassword } from "../general/edit-profile-password";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/custom-ui/breadcrumb/Breadcrumb";
import { useUserAuthState } from "@/stores/auth/use-auth-store";

export default function UsersProfilePage() {
  const { user } = useUserAuthState();
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/dashboard", { replace: true });

  const selectedTabStyle = `shrink-0 grow-0 data-[state=active]:transition-all rtl:text-xl-rtl ltr:text-lg-ltr relative w-[95%] bg-card-foreground/5 justify-start mx-auto ltr:py-2 rtl:py-[5px] data-[state=active]:bg-tertiary font-semibold data-[state=active]:text-primary-foreground gap-x-3`;

  return (
    <div className="flex flex-col gap-y-3 px-3 pt-2 pb-16">
      <Breadcrumb>
        <BreadcrumbHome onClick={handleGoHome} />
        <BreadcrumbSeparator />
        <BreadcrumbItem>{t("profile")}</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{user?.username}</BreadcrumbItem>
      </Breadcrumb>

      {/* Cards */}
      <Tabs
        dir={direction}
        defaultValue="Account"
        className="flex flex-col md:flex-row gap-y-2 gap-x-6"
      >
        <TabsList className="h-fit overflow-x-auto flex-col w-full md:w-fit md:min-w-80 bg-card border gap-4 pb-12">
          <UserProfileHeader />
          <TabsTrigger className={`mt-6 ${selectedTabStyle}`} value="Account">
            <Database className="size-[18px]" />
            {t("account_information")}
          </TabsTrigger>
          <TabsTrigger className={`${selectedTabStyle}`} value="password">
            <KeyRound className="size-[18px]" />
            {t("account_password")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Account">
          <EditProfileInformation />
        </TabsContent>
        <TabsContent value="password">
          <EditProfilePassword url="profiles/change-password" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
