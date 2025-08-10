export const StatusEnum = {
  active: 1,
  block: 2,
};

export const ChecklistEnum = {
  user: 1,
};

export const NotifierEnum = {
  confirm_adding_user: 1,
};
export const ApprovalTypeEnum = {
  approved: 1,
  pending: 2,
  rejected: 3,
};
export const AboutStaffEnum = {
  manager: 1,
  director: 2,
  technical_support: 3,
};
// Application
export const RoleEnum = {
  super: 1,
  debugger: 2,
};
export const PermissionEnum = {
  dashboard: { name: "dashboard", sub: {} },
  settings: {
    name: "settings",
    sub: {},
  },
  logs: { id: 1, name: "logs", sub: {} },
  reports: { id: 2, name: "reports", sub: {} },
  configurations: {
    id: 3,
    name: "configurations",
    sub: {
      configurations_job: 31,
      configurations_checklist: 32,
      configurations_division: 33,
      configurations_role: 34,
      configurations_application: 35,
    },
  },
  users: {
    id: 4,
    name: "users",
    sub: {
      user_information: 1,
      user_password: 2,
      account_status: 3,
    },
  },
  audit: { id: 5, name: "audit", sub: {} },
  about: {
    id: 6,
    name: "about",
    sub: {
      director: 91,
      manager: 92,
      office: 93,
      technical_sup: 94,
      slideshow: 95,
    },
  },
  approval: {
    id: 7,
    name: "approval",
    sub: {
      user: 51,
    },
  },
  activity: {
    id: 8,
    name: "activity",
    sub: {
      user_activity: 71,
    },
  },
};
