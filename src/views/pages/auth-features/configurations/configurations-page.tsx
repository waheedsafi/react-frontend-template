import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import JobTab from "./tabs/job/job-tab";
import ChecklistTab from "./tabs/checklist/checklist-tab";
import { useUserAuthState } from "@/stores/auth/use-auth-store";
import type { UserPermission } from "@/database/models";
import { PermissionEnum } from "@/database/model-enums";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/custom-ui/breadcrumb/Breadcrumb";
import { useLocation } from "react-router";

export default function ConfigurationsPage() {
  const { user } = useUserAuthState();
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  const selectedId = urlParts[urlParts.length - 1];
  const per: UserPermission = user?.permissions.get(
    PermissionEnum.configurations.name
  ) as UserPermission;

  return (
    <>
      <Breadcrumb className="mx-2 mt-2">
        <BreadcrumbHome />
        <BreadcrumbSeparator />
        <BreadcrumbItem>{t("configurations")}</BreadcrumbItem>
      </Breadcrumb>
      <Tabs
        dir={direction}
        value={selectedId}
        className="flex flex-col items-center pb-12"
      >
        {/* <TabsList className="px-0 pb-1 h-fit mt-2 flex-wrap overflow-x-auto overflow-y-hidden justify-center gap-y-1 gap-x-1">
          {tableList}
        </TabsList> */}
        <TabsContent
          value={PermissionEnum.configurations.sub.configurations_job.toString()}
          className="w-full px-4 pt-8"
        >
          <JobTab permissions={per} />
        </TabsContent>
        <TabsContent
          value={PermissionEnum.configurations.sub.configurations_checklist.toString()}
          className="w-full px-4 pt-8"
        >
          <ChecklistTab permissions={per} />
        </TabsContent>
      </Tabs>
    </>
  );
}
