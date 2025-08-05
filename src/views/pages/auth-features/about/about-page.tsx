import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import type { UserPermission } from "@/database/models";
import { PermissionEnum } from "@/database/model-enums";
import { useUserAuthState } from "@/stores/auth/use-auth-store";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/custom-ui/breadcrumb/Breadcrumb";
import AboutTechnicalTab from "@/views/pages/auth-features/about/tabs/about-technical-tab";
import AboutOfficeTab from "@/views/pages/auth-features/about/tabs/about-office-tab";
import AboutSlideshowTab from "@/views/pages/auth-features/about/tabs/about-slideshow-tab";
import AboutForm from "@/views/pages/auth-features/about/tabs/parts/about-form";

export default function AboutPage() {
  const { user } = useUserAuthState();
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const location = useLocation();
  const urlParts = location.pathname.split("/");
  const selectedId = urlParts[urlParts.length - 1];
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/dashboard", { replace: true });

  const per: UserPermission = user?.permissions.get(
    PermissionEnum.about.name
  ) as UserPermission;

  return (
    <div className="px-2 pt-2 flex flex-col relative select-none rtl:text-2xl-rtl ltr:text-xl-ltr">
      <Breadcrumb>
        <BreadcrumbHome onClick={handleGoHome} />
        <BreadcrumbSeparator />
        <BreadcrumbItem>{t("about")}</BreadcrumbItem>
      </Breadcrumb>
      <Tabs
        dir={direction}
        value={selectedId}
        className="flex flex-col pb-16 items-center"
      >
        <TabsContent
          value={PermissionEnum.about.sub.technical_sup.toString()}
          className="w-full px-2 py-8 flex flex-wrap md:flex-nowrap justify-center gap-2 overflow-hidden"
        >
          <AboutTechnicalTab permission={per} />
        </TabsContent>
        <TabsContent
          value={PermissionEnum.about.sub.director.toString()}
          className="w-full px-2 pt-8"
        >
          <AboutForm
            permission={per}
            getUrl={"about/director"}
            postUrl={"about/director"}
            putUrl={"about/director"}
            title={"director"}
          />
        </TabsContent>
        <TabsContent
          value={PermissionEnum.about.sub.manager.toString()}
          className="w-full px-2 pt-8"
        >
          <AboutForm
            permission={per}
            getUrl={"about/manager"}
            postUrl={"about/manager"}
            putUrl={"about/manager"}
            title={"manager"}
          />
        </TabsContent>
        <TabsContent
          value={PermissionEnum.about.sub.slideshow.toString()}
          className="w-full px-2 pt-8"
        >
          <AboutSlideshowTab permission={per} />
        </TabsContent>
        <TabsContent
          value={PermissionEnum.about.sub.office.toString()}
          className="w-full px-2 pt-8"
        >
          <AboutOfficeTab permission={per} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
