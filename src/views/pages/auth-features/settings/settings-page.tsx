import { useTranslation } from "react-i18next";
import LanguageTab from "./tabs/language/language-tab";
import {
  Breadcrumb,
  BreadcrumbHome,
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "@/components/custom-ui/breadcrumb/Breadcrumb";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb className="mx-2 mt-2">
        <BreadcrumbHome />
        <BreadcrumbSeparator />
        <BreadcrumbItem>{t("settings")}</BreadcrumbItem>
      </Breadcrumb>
      <LanguageTab />
    </>
  );
}
