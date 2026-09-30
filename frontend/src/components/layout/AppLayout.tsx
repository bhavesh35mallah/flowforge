import { NavLink, Outlet } from "react-router-dom";
import {
  Bell,
  CheckSquare,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "../../store/authStore";
import { logoutUser } from "../../features/auth/api/authApi";
import OrganizationSwitcher from "../../features/organizations/components/OrganizationSwitcher";

const navigation = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "My Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cashier, setcashier] = useState('');

  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  async function handleLogout() {
    try {
      await logoutUser();
    } finally {
      clearUser();
      window.location.href = "/login";
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col
          border-r border-[#e6e8ec] bg-white
          transition-transform duration-200
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-between border-b border-[#e6e8ec] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#172033] text-sm font-bold text-white">
              F
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-tight">
                FlowForge
              </p>

              <p className="text-[11px] text-[#8991a1]">
                Project workspace
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1.5 text-[#737b8c] hover:bg-[#f3f4f6] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace */}
        <div className="border-b border-[#e6e8ec] p-4">
          <button className="flex w-full items-center gap-3 rounded-lg border border-[#e4e7ec] px-3 py-2.5 text-left hover:bg-[#f8f9fb]">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#edf3ff] text-sm font-semibold text-[#3568d4]">
              AC
            </div>

           <OrganizationSwitcher />

            <ChevronDown size={15} className="text-[#8a92a2]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9aa1af]">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#eef3ff] text-[#2f62c7]"
                        : "text-[#5f6878] hover:bg-[#f5f6f8] hover:text-[#172033]"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <p className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9aa1af]">
            Manage
          </p>

          <div className="space-y-1">
            <NavLink
              to="/notifications"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5f6878] hover:bg-[#f5f6f8] hover:text-[#172033]"
            >
              <Bell size={18} strokeWidth={1.8} />
              Notifications
            </NavLink>

            <NavLink
              to="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5f6878] hover:bg-[#f5f6f8] hover:text-[#172033]"
            >
              <Settings size={18} strokeWidth={1.8} />
              Settings
            </NavLink>
          </div>
        </nav>

        {/* User */}
        <div className="border-t border-[#e6e8ec] p-3">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((value) => !value)}
              className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-[#f5f6f8]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172033] text-xs font-semibold text-white">
                {user?.name?.slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">
                  {user?.name}
                </p>

                <p className="truncate text-[11px] text-[#8991a1]">
                  {user?.email}
                </p>
              </div>

              <ChevronDown size={15} />
            </button>

            {userMenuOpen && (
              <div className="absolute bottom-[58px] left-0 right-0 rounded-lg border border-[#e3e6eb] bg-white p-1.5 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[#c43d3d] hover:bg-[#fff3f3]"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e6e8ec] bg-white/95 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 hover:bg-[#f3f4f6] lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-lg p-2.5 text-[#687182] hover:bg-[#f3f4f6]">
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3568d4]" />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
