export const UserStatusEnum = {
  active: 1,
  block: 2,
};

// Application
export const PermissionEnum = {
  users: {
    name: "users",
    sub: {
      user_information: 1,
      user_password: 2,
      user_permission: 3,
    },
  },
  dashboard: { name: "dashboard", sub: {} },
  reports: { name: "reports", sub: {} },
  configurations: {
    name: "configurations",
    sub: {
      configurations_job: 21,
      configurations_checklist: 22,
      configurations_news_type: 23,
      configurations_priority: 24,
    },
  },
  logs: { name: "logs", sub: {} },
  audit: { name: "audit", sub: {} },
  approval: {
    name: "approval",
    sub: {
      user: 31,
      ngo: 32,
      donor: 33,
    },
  },
  activity: {
    name: "activity",
    sub: {
      user: 41,
      password: 42,
    },
  },
  settings: {
    name: "settings",
    sub: {},
  },
};
export const RoleEnum = {
  super: 1,
  admin: 2,
  user: 3,
};
