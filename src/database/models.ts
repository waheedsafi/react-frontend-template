export type Role = { role: 1; name: "super" } | { role: 2; name: "debugger" };

export interface SubPermission {
  id: number;
  name: string;
  is_category: boolean;
  edit: boolean;
  view: boolean;
  delete: boolean;
  add: boolean;
}
export type UserPermission = {
  id: number;
  edit: boolean;
  view: boolean;
  delete: boolean;
  add: boolean;
  visible: boolean;
  permission: string;
  icon: string;
  priority: number;
  sub: Map<number, SubPermission>;
};
export type User = {
  id: string;
  registration_number: string;
  full_name: string;
  username: string;
  email: string;
  status?: string;
  status_id?: number;
  profile: any;
  role: Role;
  contact: string;
  job: string;
  division: string;
  permissions: Map<string, UserPermission>;
  created_at: string;
  gender: string;
};
export type Notifications = {
  id: string;
  message: string;
  type: string;
  read_status: number;
  created_at: string;
};
export type Staff = {
  picture: string;
  name: string;
  job: string;
  contact: string;
  email: string;
  id: string;
};
export interface BasicModel {
  id: number;
  name: string;
  created_at: string;
}
export type CheckList = {
  id: string;
  type: string;
  type_id: number;
  name: string;
  acceptable_extensions: string;
  active: number;
  file_size: number;
  acceptable_mimes: string;
  accept: string;
  description: string;
  saved_by: string;
  created_at: string;
};
export interface IStaffSingle {
  name_english: string;
  name_farsi: string;
  name_pashto: string;
  contact: string;
  email: string;
  id: string;
  picture: File | undefined | string;
  optional_lang: string;
  imageUrl: string;
  editable: boolean;
}
export interface Slideshow {
  id: string;
  title: string;
  description: string;
  image: undefined | string;
  date: string;
  visible: number;
  saved_by?: string;
}

export type BasicStatus = {
  id: number;
  name: string;
  is_active: number;
  saved_by: string;
  comment: string;
  status_id: number;
  created_at: string;
};
export interface ActivityModel {
  id: string;
  profile: string;
  username: string;
  userable_type: string;
  action: string;
  ip_address: string;
  platform: string;
  browser: string;
  date: string;
}
// Application
