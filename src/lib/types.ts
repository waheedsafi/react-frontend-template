import type { SubPermission, UserPermission } from "@/database/models";

export type Configuration = {
  token?: string;
  type?: string;
  language?: string;
};
export type Order = "desc" | "asc";
export interface PaginationData<T> {
  data: T[];
  lastPage: number;
  perPage: number;
  currentPage: number;
  totalItems: number;
}
export type UserSort =
  | "created_at"
  | "username"
  | "destination"
  | "status"
  | "job";
export type UserSearch = "username" | "contact" | "email";
export interface UserRecordCount {
  activeUserCount: number | null;
  inActiveUserCount: number | null;
  todayCount: number | null;
  userCount: number | null;
}
export type UserAction = "add" | "delete" | "edit" | "view" | "singleRow";
export type IUserPermission = {
  id: number;
  edit: boolean;
  view: boolean;
  delete: boolean;
  add: boolean;
  visible: boolean;
  permission: string;
  icon: string;
  priority: number;
  sub: SubPermission[];
  allSelected: boolean;
};
export type SelectUserPermission = UserPermission & {
  allSelected: boolean;
};
export interface UserInformation {
  profile: any;
  imagePreviewUrl: any;
  full_name: string;
  username: string;
  password: string;
  email: string;
  job: {
    id: string;
    name: string;
    selected: boolean;
  };
  role: {
    id: string;
    name: string;
    selected: boolean;
  };
  contact: string;
  department: {
    id: string;
    name: string;
    selected: boolean;
  };
  permission: Map<string, SelectUserPermission>;
  allSelected: boolean;
  created_at: string;
}
export interface UserPassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
export interface Option {
  name: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}
// application
