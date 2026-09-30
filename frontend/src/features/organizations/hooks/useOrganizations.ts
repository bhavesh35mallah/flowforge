import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  getOrganizations,
  updateOrganization,
} from "../api/organizationApi";

export const organizationKeys = {
  all: ["organizations"] as const,

  lists: () =>
    [...organizationKeys.all, "list"] as const,

  list: () =>
    [...organizationKeys.lists()] as const,

  details: () =>
    [...organizationKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...organizationKeys.details(), id] as const,
};

export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.list(),
    queryFn: getOrganizations,
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => getOrganization(id),
    enabled: Boolean(id),
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      name,
    }: {
      organizationId: string;
      name: string;
    }) =>
      updateOrganization(organizationId, {
        name,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}