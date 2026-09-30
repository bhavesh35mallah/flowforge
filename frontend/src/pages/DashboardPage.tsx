import { useOrganizationStore } from "../store/organizationStore";
import { useOrganization } from "../features/organizations/hooks/useOrganizations";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  Plus,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Active Projects",
    value: "8",
    change: "+2 this month",
    icon: FolderKanban,
  },
  {
    label: "Open Tasks",
    value: "24",
    change: "6 due this week",
    icon: ListTodo,
  },
  {
    label: "Completed",
    value: "86",
    change: "+18 this month",
    icon: CheckCircle2,
  },
  {
    label: "Team Members",
    value: "12",
    change: "3 new members",
    icon: Users,
  },
];

const projects = [
  {
    name: "Website Redesign",
    key: "WEB",
    progress: 74,
    tasks: "18 / 24 tasks",
    status: "On track",
  },
  {
    name: "Mobile Application",
    key: "APP",
    progress: 52,
    tasks: "13 / 25 tasks",
    status: "On track",
  },
  {
    name: "Marketing Campaign",
    key: "MKT",
    progress: 31,
    tasks: "8 / 26 tasks",
    status: "At risk",
  },
];

const activities = [
  {
    user: "Sarah Wilson",
    action: "completed",
    target: "Homepage redesign",
    time: "12 minutes ago",
  },
  {
    user: "Michael Chen",
    action: "created",
    target: "API integration task",
    time: "42 minutes ago",
  },
  {
    user: "Emma Davis",
    action: "commented on",
    target: "Mobile application",
    time: "1 hour ago",
  },
  {
    user: "James Miller",
    action: "moved",
    target: "Checkout optimization to Review",
    time: "2 hours ago",
  },
];

export default function DashboardPage() {
  
  const activeOrganizationId =
    useOrganizationStore(
      (state) => state.activeOrganizationId
    );
  
  const { data: organization } =
    useOrganization(activeOrganizationId ?? "");
  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Page heading */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#8b93a2]">
            Wednesday, September 30
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#172033]">
            Good morning, Bhavesh
          </h1>

          <p className="mt-1 text-sm text-[#64748b]">
            Here's what's happening in{" "}
            <span className="font-medium text-[#273244]">
              {organization?.name ?? "your organization"}
            </span>
            .
          </p>

          <p className="mt-1 text-sm text-[#747d8d]">
            Here is what's happening across your workspace.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#172033] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#253047]">
          <Plus size={17} />
          New project
        </button>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#e3e6eb] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#7c8595]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-[#f2f5fa] p-2.5 text-[#52647f]">
                  <Icon size={19} strokeWidth={1.8} />
                </div>
              </div>

              <p className="mt-4 text-xs text-[#7f8898]">
                {stat.change}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main grid */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        {/* Projects */}
        <div className="rounded-xl border border-[#e3e6eb] bg-white">
          <div className="flex items-center justify-between border-b border-[#e9ebef] px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold">
                Active projects
              </h2>

              <p className="mt-0.5 text-xs text-[#8991a1]">
                Current project progress
              </p>
            </div>

            <button className="text-xs font-medium text-[#3568d4] hover:underline">
              View all
            </button>
          </div>

          <div className="divide-y divide-[#edf0f3]">
            {projects.map((project) => (
              <div
                key={project.key}
                className="px-5 py-5 transition hover:bg-[#fafbfc]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf3ff] text-xs font-semibold text-[#3568d4]">
                      {project.key}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {project.name}
                      </p>

                      <p className="mt-0.5 text-xs text-[#8b93a2]">
                        {project.tasks}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${project.status === "On track"
                        ? "bg-[#edf8f1] text-[#287348]"
                        : "bg-[#fff6e8] text-[#9a6716]"
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#edf0f3]">
                    <div
                      className="h-full rounded-full bg-[#3568d4]"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>

                  <span className="w-9 text-right text-xs font-medium text-[#697385]">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-xl border border-[#e3e6eb] bg-white">
          <div className="flex items-center justify-between border-b border-[#e9ebef] px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold">
                Recent activity
              </h2>

              <p className="mt-0.5 text-xs text-[#8991a1]">
                Latest workspace updates
              </p>
            </div>

            <button className="text-[#8b93a2] hover:text-[#172033]">
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="divide-y divide-[#edf0f3]">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex gap-3 px-5 py-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef1f5] text-[10px] font-semibold text-[#566175]">
                  {activity.user
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <div className="min-w-0">
                  <p className="text-sm leading-5 text-[#4f596b]">
                    <span className="font-medium text-[#172033]">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium text-[#172033]">
                      {activity.target}
                    </span>
                  </p>

                  <p className="mt-1 text-[11px] text-[#9299a7]">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-[#e3e6eb] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#f2f5fa] p-2.5 text-[#52647f]">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-[#8991a1]">
                Due this week
              </p>

              <p className="mt-1 text-xl font-semibold">
                14 tasks
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e3e6eb] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#edf8f1] p-2.5 text-[#287348]">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-xs text-[#8991a1]">
                Completion rate
              </p>

              <p className="mt-1 text-xl font-semibold">
                78%
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e3e6eb] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#fff6e8] p-2.5 text-[#9a6716]">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-[#8991a1]">
                Pending reviews
              </p>

              <p className="mt-1 text-xl font-semibold">
                6 tasks
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}