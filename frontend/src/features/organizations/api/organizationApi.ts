import { api } from "../../../lib/api";

import type {
  Organization,
  OrganizationResponse,
  OrganizationsResponse,
} from "../types/organization.types";

export interface CreateOrganizationPayload {
  name: string;
}

export interface UpdateOrganizationPayload {
  name: string;
}

export async function getOrganizations(): Promise<Organization[]> {
  const response = await api.get<OrganizationsResponse>(
    "/organizations"
  );

  return response.data.organizations;
}

export async function getOrganization(
  organizationId: string
): Promise<Organization> {
  const response = await api.get<OrganizationResponse>(
    `/organizations/${organizationId}`
  );

  return response.data.organization;
}

export async function createOrganization(
  payload: CreateOrganizationPayload
): Promise<Organization> {
  const response = await api.post<OrganizationResponse>(
    "/organizations",
    payload
  );

  return response.data.organization;
}

export async function updateOrganization(
  organizationId: string,
  payload: UpdateOrganizationPayload
): Promise<Organization> {
  const response = await api.patch<OrganizationResponse>(
    `/organizations/${organizationId}`,
    payload
  );

  return response.data.organization;
}

export async function deleteOrganization(
  organizationId: string
): Promise<void> {
  await api.delete(`/organizations/${organizationId}`);
}