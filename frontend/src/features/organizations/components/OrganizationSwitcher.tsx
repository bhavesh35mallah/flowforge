import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useOrganizations } from "../hooks/useOrganizations";
import { useOrganizationStore } from "../../../store/organizationStore";

export default function OrganizationSwitcher() {
  const { data: organizations = [], isLoading } =
    useOrganizations();

  const {
    activeOrganizationId,
    setActiveOrganization,
  } = useOrganizationStore();

  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * Automatically select the first organization
   * when no organization has been selected yet.
   */
  useEffect(() => {
    if (
      !activeOrganizationId &&
      organizations.length > 0
    ) {
      setActiveOrganization(organizations[0].id);
    }
  }, [
    activeOrganizationId,
    organizations,
    setActiveOrganization,
  ]);

  /*
   * If the persisted organization was deleted,
   * fall back to the first available organization.
   */
  useEffect(() => {
    if (
      activeOrganizationId &&
      organizations.length > 0 &&
      !organizations.some(
        (organization) =>
          organization.id === activeOrganizationId
      )
    ) {
      setActiveOrganization(organizations[0].id);
    }
  }, [
    activeOrganizationId,
    organizations,
    setActiveOrganization,
  ]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const activeOrganization = organizations.find(
    (organization) =>
      organization.id === activeOrganizationId
  );

  if (isLoading) {
    return (
      <div className="h-[58px] animate-pulse rounded-lg bg-[#f1f4f8]" />
    );
  }

  if (!activeOrganization) {
    return (
      <Link
        to="/organizations"
        className="flex items-center gap-3 rounded-lg border border-dashed border-[#cbd5e1] p-3 transition hover:bg-[#f8fafc]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2563eb]">
          <Building2 className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#172033]">
            Create organization
          </p>

          <p className="text-xs text-[#94a3b8]">
            Get started
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 rounded-lg border border-[#e2e7ee] bg-white p-3 text-left transition hover:bg-[#f8fafc]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2563eb]">
          <Building2 className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#172033]">
            {activeOrganization.name}
          </p>

          <p className="text-xs text-[#94a3b8]">
            {activeOrganization._count?.members ?? 0} members
          </p>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#94a3b8] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-[#e2e7ee] bg-white p-1.5 shadow-lg">
          <div className="px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
              Your organizations
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {organizations.map((organization) => {
              const selected =
                organization.id ===
                activeOrganizationId;

              return (
                <button
                  key={organization.id}
                  type="button"
                  onClick={() => {
                    setActiveOrganization(
                      organization.id
                    );

                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    selected
                      ? "bg-[#f1f5f9]"
                      : "hover:bg-[#f8fafc]"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#2563eb]">
                    <Building2 className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#273244]">
                      {organization.name}
                    </p>

                    <p className="text-xs text-[#94a3b8]">
                      {organization._count?.members ?? 0} members
                    </p>
                  </div>

                  {selected && (
                    <Check className="h-4 w-4 text-[#2563eb]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-1 border-t border-[#eef1f5] pt-1">
            <Link
              to="/organizations"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
            >
              <Plus className="h-4 w-4" />
              Manage organizations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}