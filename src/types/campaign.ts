export type EmailStatus = "ready" | "sent" | "generating" | "failed";
export type PlanType = "free" | "pro";

export interface Campaign {
  id: string;
  name: string;
  userId: string;
  totalCount: number;
  readyCount: number;
  sentCount: number;
  generatingCount: number;
  failedCount: number;
  createdAt: string;
}

export interface EmailDraft {
  id: string;
  campaignId: string;
  hrEmail: string;
  subject: string;
  body: string;
  status: EmailStatus;
  jobDescription?: string;
  createdAt: string;
}

export interface UserPlan {
  type: PlanType;
  emailsUsedToday: number;
  dailyLimit: number;
}
