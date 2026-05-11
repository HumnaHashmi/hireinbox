export interface Message {
  id: string;
  threadId: string;
  from: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  attachments: Attachment[];
  createdAt: string;
}

export interface Thread {
  id: string;
  subject: string;
  participants: Array<{ id: string; name: string; avatar?: string }>;
  messages: Message[];
  lastMessage: Message;
  messageCount: number;
  isRead: boolean;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export type InboxTab = "all" | "unread" | "starred" | "sent" | "archived";
