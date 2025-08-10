import axiosClient from "@/lib/axois-client";
import { useTranslation } from "react-i18next";
import type { Applications, UserPermission } from "@/database/models";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PermissionEnum } from "@/database/model-enums";
import CustomCheckbox from "@/components/custom-ui/checkbox/CustomCheckbox";
import Shimmer from "@/components/custom-ui/shimmer/shimmer";

interface ApplicationTabProps {
  permissions: UserPermission;
}
export default function ApplicationTab(props: ApplicationTabProps) {
  const { permissions } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [storing, setStoring] = useState(false);
  const [applications, setApplications] = useState<Applications[]>([]);
  const initialize = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/applications");
      if (response.status == 200) {
        setApplications(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const hasEdit = permissions.sub.get(
    PermissionEnum.configurations.sub.configurations_role
  )?.edit;

  const saveData = async (data: any) => {
    let result = false;
    if (loading) {
      return;
    }
    setStoring(true);

    try {
      const response = await axiosClient.put("applications", data);
      if (response.status == 200) {
        result = true;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setStoring(false);
    }
    return result;
  };
  const onChangeBool = async (item: Applications, value: boolean) => {
    if (hasEdit) {
      const result = await saveData({
        id: item.id,
        value: `${value}`,
      });
      if (result) {
        toast.success(t("success"));
        setApplications((prev) => {
          const updatedList = [...prev]; // clone the array
          const index = updatedList.findIndex((item) => item.id === item.id);

          if (index !== -1) {
            item.value = `${value}`;
            updatedList[index] = item; // replace at same position
          }

          return updatedList;
        });
      }
    }
  };
  return (
    <>
      {loading ? (
        <Shimmer className="h-14 rounded" />
      ) : (
        applications.map((item) => {
          if (item.cast_to === "bool") {
            return (
              <CustomCheckbox
                loading={storing}
                checked={item.value === "true"}
                onCheckedChange={(value: boolean) => onChangeBool(item, value)}
                description={item.description}
                parentClassName="rounded-md py-[12px] gap-x-1 bg-card border px-[10px]"
                text={item.name}
              />
            );
          }
          return undefined;
        })
      )}
    </>
  );
}
