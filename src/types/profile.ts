export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  resumeUrl?: string;
  isPublic: boolean;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
}
