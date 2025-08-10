import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import StepTab from "./step-tab";

export interface DonorApprovalPageProps {
  pendingUrl: string;
  approvedUrl: string;
  rejectedUrl: string;
}

export default function ApprovalTab(props: DonorApprovalPageProps) {
  const { pendingUrl, approvedUrl, rejectedUrl } = props;
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();

  const tabStyle =
    "border-0 cursor-pointer data-[state=active]:bg-tertiary/5 data-[state=active]:border-tertiary grow-0 text-muted-foreground transition-colors duration-300 data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:border-b-[2px] h-full rounded-none";

  return (
    <Tabs
      dir={direction}
      className="border-t rounded-lg p-0 h-full space-y-0"
      defaultValue="pending"
    >
      <TabsList className="overflow-x-auto transition overflow-y-hidden bg-card w-full justify-start p-0 m-0 rounded-none">
        <TabsTrigger value="pending" className={tabStyle}>
          {t("pending")}
        </TabsTrigger>
        <TabsTrigger value="approved" className={tabStyle}>
          {t("approved")}
        </TabsTrigger>

        <TabsTrigger value="rejected" className={tabStyle}>
          {t("rejected")}
        </TabsTrigger>
      </TabsList>
      <TabsContent className="space-y-1" value="pending">
        <StepTab url={pendingUrl} />
      </TabsContent>
      <TabsContent className="space-y-1" value="approved">
        <StepTab url={approvedUrl} />
      </TabsContent>
      <TabsContent className="space-y-1" value="rejected">
        <StepTab url={rejectedUrl} />
      </TabsContent>
    </Tabs>
  );
}
