export type OrganizationRole =
  | "ORG_ADMIN"
  | "PROJECT_MANAGER"
  | "MEMBER";

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export interface OrganizationMember {
  id: string;
  role: OrganizationRole;
  user: OrganizationUser;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;

  members?: OrganizationMember[];

  _count?: {
    members: number;
    projects: number;
  };
}

export interface OrganizationsResponse {
  success: boolean;
  organizations: Organization[];
}

export interface OrganizationResponse {
  success: boolean;
  organization: Organization;
}