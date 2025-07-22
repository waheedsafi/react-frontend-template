import type { SubPermission, UserPermission } from "@/database/models";
import type { Configuration } from "@/lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const setConfiguration = (data: Configuration) => {
  localStorage.setItem(
    import.meta.env.VITE_TOKEN_STORAGE_KEY,
    JSON.stringify(data)
  );
};
export const getConfiguration = (): Configuration | null => {
  const data = localStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY);
  if (data) return JSON.parse(data);
  else return null;
};
export const removeToken = () => {
  const configuration = getConfiguration();
  setConfiguration({
    ...configuration,
    token: undefined,
  });
};
export const setToken = (data: { token: string; type: string }) => {
  const configuration = getConfiguration();
  setConfiguration({
    ...configuration,
    token: data.token,
    type: data.type,
  });
};
export const returnPermissionsMap = (
  permissions: any
): Map<string, UserPermission> => {
  const permissionMap = new Map<string, UserPermission>();
  if (permissions != null || permissions != undefined) {
    for (let i = 0; i < permissions.length; i++) {
      const item: any = permissions[i];
      const subPermissions = item.sub as SubPermission[];
      const subMap: Map<number, SubPermission> = new Map(
        subPermissions.map((subPermission) => [subPermission.id, subPermission])
      );
      const permission: UserPermission = {
        id: item.user_permission_id,
        view: item.view,
        edit: item.edit,
        delete: item.delete,
        add: item.add,
        visible: item.visible,
        icon: item.icon,
        priority: item.priority,
        permission: item.permission,
        sub: subMap,
      };
      permissionMap.set(item.permission, permission);
    }
  }
  return permissionMap;
};

export const checkStrength = (pass: string, t: any) => {
  const requirements = [
    { regex: /.{8,}/, text: t("at_lea_8_char") },
    { regex: /[0-9]/, text: t("at_lea_1_num") },
    { regex: /[a-z]/, text: t("at_lea_1_lowcas_lett") },
    { regex: /[A-Z]/, text: t("at_lea_1_upcas_lett") },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(pass),
    text: req.text,
  }));
};
export const passwordStrengthScore = (
  strength: {
    met: boolean;
    text: any;
  }[]
): number => strength.filter((req) => req.met).length;
export function isFile(input: any): input is File {
  return input instanceof File;
}
export const isString = (value: any) => typeof value === "string";
export function formatPhoneNumber(phone: string) {
  return phone.replace(/(\d{2})(\d{3})(\d{2})(\d{4})/, "$1 $2 $3 $4");
}

// application
