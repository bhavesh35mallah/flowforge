import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationState {
  activeOrganizationId: string | null;

  setActiveOrganization: (organizationId: string) => void;
  clearActiveOrganization: () => void;
}

export const useOrganizationStore =
  create<OrganizationState>()(
    persist(
      (set) => ({
        activeOrganizationId: null,

        setActiveOrganization: (organizationId) =>
          set({
            activeOrganizationId: organizationId,
          }),

        clearActiveOrganization: () =>
          set({
            activeOrganizationId: null,
          }),
      }),
      {
        name: "flowforge-organization",
      }
    )
  );