export const ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
} as const;

export const MESSAGE_STATUS = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
} as const;

export const INBOX_TABS = ["all", "unread", "starred", "sent", "archived"] as const;

export const SKILLS_MAX = 20;
export const BIO_MAX_LENGTH = 500;
export const ATTACHMENT_MAX_SIZE_MB = 10;
