export type Role =
  | { role: 1; name: "super" }
  | { role: 2; name: "admin" }
  | { role: 3; name: "user" };

export interface SubPermission {
  id: number;
  name: string;
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
  status: number;
  profile: any;
  role: Role;
  contact: string;
  job: string;
  department: string;
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
// Application
