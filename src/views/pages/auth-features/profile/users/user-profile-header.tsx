import { Pencil, Trash2 } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "@/lib/axois-client";
import NastranSpinner from "@/components/custom-ui/spinner/NastranSpinner";
import CachedImage from "@/components/custom-ui/image/CachedImage";
import { validateFile } from "@/lib/utils";
import { useUserAuthState } from "@/stores/auth/use-auth-store";
import { toast } from "sonner";
import IconButton from "@/components/custom-ui/button/icon-button";

export default function UserProfileHeader() {
  const { user, setUser } = useUserAuthState();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onFileUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (loading) return;

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const validTypes: string[] = ["image/jpeg", "image/png", "image/jpg"];
    const fileInput = e.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const checkFile = fileInput.files[0] as File;
    const file = validateFile(
      checkFile,
      Math.round(maxFileSize),
      validTypes,
      t
    );
    if (file) {
      setLoading(true);
      // Update profile
      const formData = new FormData();
      formData.append("profile", file);
      try {
        const response = await axiosClient.post(
          "profiles-users/picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          // Change logged in user data
          await setUser({
            ...user,
            profile: response.data.profile,
          });
          toast.success(response.data.message);
        }
      } catch (error: any) {
        toast.success(error.response.data.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
      /** Reset file input */
      if (e.currentTarget) {
        e.currentTarget.type = "text";
        e.currentTarget.type = "file"; // Reset to file type
      }
    }
  };
  const deleteProfilePicture = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosClient.delete("profiles");
      if (response.status == 200) {
        // Change logged in user data
        setUser({
          ...user,
          profile: undefined,
        });
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="self-center text-center">
      <CachedImage
        src={user?.profile}
        alt="Avatar"
        shimmerClassName="size-[86px] !mt-6 mx-auto shadow-lg border border-primary/30 rounded-full"
        className="size-[86px] !mt-6 object-center object-cover mx-auto shadow-lg border border-primary/50 rounded-full"
        routeIdentifier={"profile"}
      />
      {loading && (
        <NastranSpinner
          label={t("in_progress")}
          className="size-[14px] mt-2"
          labelclassname="text-primary/80 rtl:text-sm-rtl ltr:text-sm-ltr"
        />
      )}
      <div className="flex self-center justify-center !mt-2 !mb-6 gap-x-4">
        <IconButton className="hover:bg-primary/20 transition-all text-primary">
          <label
            className={`flex w-fit gap-x-1 items-center cursor-pointer justify-center`}
          >
            <Pencil className={`size-[13px] pointer-events-none`} />
            <h1 className={`rtl:text-lg-rtl ltr:text-md-ltr`}>{t("choose")}</h1>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              className={`block w-0 h-0`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onFileUploadChange(e);
              }}
            />
          </label>
        </IconButton>

        <IconButton
          className="hover:bg-red-400/30 transition-all border-red-400/40 text-red-400"
          onClick={deleteProfilePicture}
        >
          <Trash2 className="size-[13px] pointer-events-none" />
          <h1 className="rtl:text-lg-rtl ltr:text-md-ltr">{t("delete")}</h1>
        </IconButton>
      </div>

      <h1 className="text-primary font-semibold rtl:text-2xl-rtl ltr:text-4xl-ltr">
        {user?.username}
      </h1>
      <h1 className="leading-6 rtl:text-sm-rtl ltr:text-2xl-ltr break-all">
        {user?.email}
      </h1>
      <h1 dir="ltr" className="text-primary rtl:text-md-rtl ltr:text-xl-ltr">
        {user?.contact}
      </h1>
    </div>
  );
}
