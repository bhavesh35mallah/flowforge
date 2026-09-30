import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { loginUser } from "../features/auth/api/authApi";
import { loginSchema, type LoginFormData } from "../features/auth/schemas/loginSchema";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      const response = await loginUser(data);

      if (response.success && response.user) {
        setUser(response.user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to sign in. Please check your email and password.";

      setServerError(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_520px]">
        {/* -------------------------------------------------
            LEFT BRANDING SECTION
        ------------------------------------------------- */}
        <section className="relative hidden overflow-hidden bg-[#f1f4f8] lg:flex">
          <div className="relative z-10 flex w-full flex-col px-14 py-12 xl:px-20">
            {/* Logo */}
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172033] text-white shadow-sm">
                <span className="text-lg font-bold">F</span>
              </div>

              <span className="text-xl font-bold tracking-tight text-[#172033]">
                FlowForge
              </span>
            </Link>

            {/* Main content */}
            <div className="my-auto max-w-2xl py-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce2ea] bg-white px-3.5 py-2 text-sm font-medium text-[#4b5563] shadow-sm">
                <Sparkles className="h-4 w-4 text-[#2563eb]" />
                Built for modern teams
              </div>

              <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.035em] text-[#172033] xl:text-6xl">
                Bring your team's work into one place.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748b]">
                Plan projects, manage tasks, collaborate with your team,
                and keep every important update organized in FlowForge.
              </p>

              {/* Features */}
              <div className="mt-10 grid max-w-xl gap-5 sm:grid-cols-2">
                <Feature
                  icon={Zap}
                  title="Stay organized"
                  description="Keep projects and tasks structured."
                />

                <Feature
                  icon={Users}
                  title="Work together"
                  description="Give everyone clear ownership."
                />

                <Feature
                  icon={ShieldCheck}
                  title="Secure access"
                  description="Protected authentication and sessions."
                />

                <Feature
                  icon={Check}
                  title="Track progress"
                  description="See what's moving and what's blocked."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-6 border-t border-[#dce2ea] pt-6 text-sm text-[#64748b]">
              <span>© {new Date().getFullYear()} FlowForge</span>

              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="transition-colors hover:text-[#172033]"
                >
                  Privacy
                </a>

                <a
                  href="#"
                  className="transition-colors hover:text-[#172033]"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#dbe2eb]" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#dbe2eb]" />
        </section>

        {/* -------------------------------------------------
            RIGHT LOGIN SECTION
        ------------------------------------------------- */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">
          <div className="w-full max-w-[400px]">
            {/* Mobile logo */}
            <div className="mb-12 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#172033] text-white">
                  <span className="text-lg font-bold">F</span>
                </div>

                <span className="text-xl font-bold tracking-tight text-[#172033]">
                  FlowForge
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-[#172033]">
                Welcome back
              </h2>

              <p className="mt-2 text-[15px] leading-6 text-[#64748b]">
                Sign in to continue to your FlowForge workspace.
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {serverError}
              </div>
            )}

            {/* Login form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#273244]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]" />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    className={`h-12 w-full rounded-lg border bg-white pl-11 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#a0a9b8] ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-[#d9dee7] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#273244]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-[#2563eb] transition hover:text-[#1d4ed8]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`h-12 w-full rounded-lg border bg-white pl-11 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#a0a9b8] ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-[#d9dee7] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
                    }`}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] transition hover:text-[#475569]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#cbd5e1] text-[#2563eb] accent-[#2563eb] focus:ring-[#2563eb]"
                  />

                  <span className="text-sm text-[#64748b]">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#172033] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#222d42] focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e5e7eb]" />

              <span className="text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
                New to FlowForge?
              </span>

              <div className="h-px flex-1 bg-[#e5e7eb]" />
            </div>

            {/* Register */}
            <Link
              to="/register"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-[#d9dee7] bg-white text-sm font-semibold text-[#273244] transition hover:border-[#b9c2cf] hover:bg-[#f8fafc]"
            >
              Create an account
            </Link>

            {/* Security note */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#e7ebf0] bg-[#f8fafc] p-4">
              <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#64748b]" />

              <p className="text-xs leading-5 text-[#64748b]">
                Your session is securely protected. FlowForge uses
                HTTP-only authentication cookies to keep your account
                credentials out of browser storage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------
   Feature component
------------------------------------------------- */

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="flex gap-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#dce2ea] bg-white text-[#2563eb] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#273244]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#64748b]">
          {description}
        </p>
      </div>
    </div>
  );
}