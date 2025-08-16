import type { FileType } from "@/lib/types";

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
export type Notification = {
  id: string;
  message: string;
  notifier_id: string;
  is_read: boolean;
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
export interface FAQ {
  id: number;
  question: string;
  order?: number;
  type: string;
  answer?: string;
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
export interface Approval {
  id: string;
  request_comment: string;
  request_date: string;
  respond_comment: string;
  respond_date: string;
  approval_type_id: string;
  approval_type: string;
  requester_id: string;
  requester: string;
  responder_id: string;
  responder_name: string;
  notifier_type_id: number;
  notifier_type: string;
  document_count: string;
}
export interface ApprovalDocument extends FileType {
  document_id: string;
  checklist_id: string;
  checklist_name: string;
  acceptable_extensions: string;
  acceptable_mimes: string;
  description: string;
}
export interface IApproval {
  id: string;
  requester_id: string;
  requester_name: string;
  request_date: string;
  start_date: string;
  end_date: string;
  request_comment: string;
  responder_id?: string;
  responder?: string;
  respond_date?: string;
  respond_comment?: string;
  notifier_type_id: number;
  notifier_type: string;
  approval_documents: ApprovalDocument[];
  completed: boolean;
}
export interface Applications {
  id: string;
  cast_to: string;
  value: string;
  description: string;
  name: string;
}
export interface ErrorLog {
  id: string;
  created_at: string;
  error_message: string;
  username: string;
  user_id: number | string;
  ip_address: string;
  method: string;
  exception_type: string;
  error_code: string;
  uri: string;
  trace: string;
}
// Application
