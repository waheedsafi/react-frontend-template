import BooleanStatusButton from "@/components/custom-ui/button/BooleanStatusButton";
import CloseButton from "@/components/custom-ui/button/CloseButton";
import IconButton from "@/components/custom-ui/button/icon-button";
import FakeCombobox from "@/components/custom-ui/combobox/FakeCombobox";
import NastranSpinner from "@/components/custom-ui/spinner/NastranSpinner";
import CustomTextarea from "@/components/custom-ui/textarea/CustomTextarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalState } from "@/context/GlobalStateContext";
import { NotifierEnum } from "@/database/model-enums";
import type { IApproval } from "@/database/models";
import axiosClient from "@/lib/axois-client";
import { toLocaleDate } from "@/lib/utils";
import { CalendarDays, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface ViewApprovalDailogprops {
  onComplete: (id: string) => void;
  onClose: () => void;
  approval_id: string;
}
export default function ViewApprovalDailog(props: ViewApprovalDailogprops) {
  const { onComplete, onClose, approval_id } = props;
  const [loading, setLoading] = useState(true);
  const [state] = useGlobalState();
  const { t } = useTranslation();
  const [approval, setApproval] = useState<IApproval | undefined>(undefined);

  const loadInformation = async () => {
    try {
      const response = await axiosClient.get(`approvals/${approval_id}`);
      if (response.status == 200) {
        setApproval(response.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadInformation();
  }, []);
  const action = async (approved: boolean) => {
    try {
      if (loading) return;
      setLoading(true);
      const response = await axiosClient.post("approvals", {
        approved: approved,
        approval_id: approval_id,
        respond_comment: approval?.respond_comment,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        onComplete(approval_id);
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full my-16 self-center [backdrop-filter:blur(20px)] bg-card">
      {loading ? (
        <NastranSpinner className="mt-4" />
      ) : (
        <>
          <CardHeader className="text-start sticky top-0 rounded-t-lg border-b bg-card pb-2 z-10">
            <CardTitle className="rtl:text-4xl-rtl mb-4 ltr:text-3xl-ltr text-tertiary">
              {t("approval")}
            </CardTitle>
            <CloseButton
              parentClassName="absolute rtl:left-0 ltr:right-2 -top-3"
              dismissModel={onClose}
            />
            {!approval?.completed && (
              <div className="flex gap-x-3">
                <IconButton
                  className="hover:bg-green-400/5 transition-all border-green-400/40 text-green-400"
                  onClick={() => action(true)}
                >
                  <Check className="size-[13px] pointer-events-none" />
                  <h1 className="rtl:text-lg-rtl ltr:text-md-ltr font-normal">
                    {t("approve")}
                  </h1>
                </IconButton>
                <IconButton
                  className="hover:bg-red-400/5 transition-all border-red-400/40 text-red-400"
                  onClick={() => action(false)}
                >
                  <X className="size-[13px] pointer-events-none" />
                  <h1 className="rtl:text-lg-rtl ltr:text-md-ltr">
                    {t("reject")}
                  </h1>
                </IconButton>
              </div>
            )}

            <BooleanStatusButton
              className=" mx-0 mt-3"
              getColor={function (): {
                style: string;
                value?: string;
              } {
                return NotifierEnum.confirm_adding_user ===
                  approval?.notifier_type_id
                  ? {
                      style: "border-blue-500/90",
                      value: approval.notifier_type,
                    }
                  : {
                      style: "border-orange-500",
                      value: approval?.notifier_type,
                    };
              }}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4 pb-12 pt-4 text-start">
            <FakeCombobox
              className="w-full md:w-1/2 xl:w-1/3"
              title={t("requester")}
              selected={approval?.requester_name}
            />
            <FakeCombobox
              icon={
                <CalendarDays className="size-[16px] text-tertiary absolute top-1/2 transform -translate-y-1/2 ltr:right-4 rtl:left-4" />
              }
              className="w-full md:w-1/2 xl:w-1/3"
              title={t("request_date")}
              selected={toLocaleDate(new Date(approval!.request_date), state)}
            />
            {approval?.respond_date && (
              <>
                <FakeCombobox
                  className="w-full md:w-1/2 xl:w-1/3"
                  title={t("responder")}
                  selected={approval?.responder}
                />
                <FakeCombobox
                  icon={
                    <CalendarDays className="size-[16px] text-tertiary absolute top-1/2 transform -translate-y-1/2 ltr:right-4 rtl:left-4" />
                  }
                  className="w-full md:w-1/2 xl:w-1/3"
                  title={t("respond_date")}
                  selected={toLocaleDate(
                    new Date(approval.respond_date),
                    state
                  )}
                />
              </>
            )}
            <CustomTextarea
              label={t("responder_comment")}
              rows={4}
              disabled={approval?.respond_comment ? true : false}
              maxLength={300}
              placeholder={`${t("detail")}...`}
              defaultValue={approval?.respond_comment}
              onChange={(e: any) => {
                const { value } = e.target;
                const newApproval = approval;
                if (newApproval) newApproval.respond_comment = value;
                setApproval(newApproval);
              }}
            />
          </CardContent>
        </>
      )}
    </Card>
  );
}
