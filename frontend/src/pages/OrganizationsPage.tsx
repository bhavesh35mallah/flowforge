import { useState } from "react";
import { Building2, Plus, Users, FolderKanban } from "lucide-react";

import {
  useCreateOrganization,
  useOrganizations,
} from "../features/organizations/hooks/useOrganizations";

export default function OrganizationsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState("");

  const {
    data: organizations = [],
    isLoading,
    isError,
  } = useOrganizations();

  const createMutation = useCreateOrganization();

  const handleCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: trimmedName,
      });

      setName("");
      setIsCreateOpen(false);
    } catch {
      // API error is exposed through createMutation.error
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
            Organizations
          </h1>

          <p className="mt-1 text-sm text-[#64748b]">
            Manage your workspaces and teams.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#172033] px-4 text-sm font-semibold text-white transition hover:bg-[#222d42]"
        >
          <Plus className="h-4 w-4" />
          New organization
        </button>
      </div>

      {/* Content */}
      <div className="mt-8">
        {isLoading && (
          <div className="rounded-xl border border-[#e2e7ee] bg-white p-8 text-center text-sm text-[#64748b]">
            Loading organizations...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            Unable to load your organizations.
          </div>
        )}

        {!isLoading &&
          !isError &&
          organizations.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#cfd6e0] bg-white p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f4f8] text-[#64748b]">
                <Building2 className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-[#172033]">
                No organizations yet
              </h2>

              <p className="mx-auto mt-1 max-w-md text-sm text-[#64748b]">
                Create your first organization to start managing
                projects and collaborating with your team.
              </p>

              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-[#172033] px-4 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Create organization
              </button>
            </div>
          )}

        {!isLoading && !isError && organizations.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {organizations.map((organization) => (
              <div
                key={organization.id}
                className="rounded-xl border border-[#e2e7ee] bg-white p-5 shadow-sm transition hover:border-[#cbd3de] hover:shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4ff] text-[#2563eb]">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>

                <h2 className="mt-5 text-base font-semibold text-[#172033]">
                  {organization.name}
                </h2>

                <p className="mt-1 text-sm text-[#94a3b8]">
                  {organization.slug}
                </p>

                <div className="mt-5 flex items-center gap-5 border-t border-[#eef1f5] pt-4">
                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <Users className="h-4 w-4" />
                    {organization._count?.members ?? 0}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#64748b]">
                    <FolderKanban className="h-4 w-4" />
                    {organization._count?.projects ?? 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-[#172033]">
              Create organization
            </h2>

            <p className="mt-1 text-sm text-[#64748b]">
              Create a workspace for your team.
            </p>

            <form
              onSubmit={handleCreate}
              className="mt-6"
            >
              <label
                htmlFor="organization-name"
                className="mb-2 block text-sm font-medium text-[#273244]"
              >
                Organization name
              </label>

              <input
                id="organization-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Acme Corporation"
                autoFocus
                className="h-11 w-full rounded-lg border border-[#d9dee7] px-3.5 text-sm text-[#172033] outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
              />

              {createMutation.isError && (
                <p className="mt-2 text-xs text-red-600">
                  {(createMutation.error as any)?.response?.data
                    ?.message ||
                    "Unable to create organization."}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setName("");
                  }}
                  className="h-10 rounded-lg border border-[#d9dee7] px-4 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    !name.trim() ||
                    createMutation.isPending
                  }
                  className="h-10 rounded-lg bg-[#172033] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {createMutation.isPending
                    ? "Creating..."
                    : "Create organization"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}