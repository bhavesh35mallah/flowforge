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
  User,
  Users,
  Zap,
} from "lucide-react";

import { registerUser } from "../features/auth/api/authApi";
import {
  registerSchema,
  type RegisterFormData,
} from "../features/auth/schemas/registerSchema";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.success && response.user) {
        setUser(response.user);

        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to create your account. Please try again.";

      setServerError(message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_520px]">
        {/* LEFT SECTION */}
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

            {/* Main */}
            <div className="my-auto max-w-2xl py-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce2ea] bg-white px-3.5 py-2 text-sm font-medium text-[#4b5563] shadow-sm">
                <Zap className="h-4 w-4 text-[#2563eb]" />
                Start managing work better
              </div>

              <h1 className="max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.035em] text-[#172033] xl:text-6xl">
                Build a better workflow for your team.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#64748b]">
                Create your FlowForge workspace and bring projects,
                tasks, people, and progress together.
              </p>

              <div className="mt-10 space-y-5">
                <Benefit
                  icon={Check}
                  title="Organize projects"
                  description="Keep every project and task in one structured workspace."
                />

                <Benefit
                  icon={Users}
                  title="Collaborate with your team"
                  description="Assign work and keep everyone aligned."
                />

                <Benefit
                  icon={ShieldCheck}
                  title="Secure by design"
                  description="Your account session is protected with HTTP-only cookies."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#dce2ea] pt-6 text-sm text-[#64748b]">
              © {new Date().getFullYear()} FlowForge
            </div>
          </div>

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#dbe2eb]" />

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#dbe2eb]" />
        </section>

        {/* RIGHT SECTION */}
        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">
          <div className="w-full max-w-[400px]">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
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
                Create your account
              </h2>

              <p className="mt-2 text-[15px] leading-6 text-[#64748b]">
                Get started with your FlowForge workspace.
              </p>
            </div>

            {/* Error */}
            {serverError && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {serverError}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#273244]"
                >
                  Full name
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]" />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Bhavesh Patel"
                    {...register("name")}
                    className={`h-12 w-full rounded-lg border bg-white pl-11 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#a0a9b8] ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-[#d9dee7] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#273244]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    {...register("password")}
                    className={`h-12 w-full rounded-lg border bg-white pl-11 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#a0a9b8] ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-[#d9dee7] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
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

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#273244]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a3b8]" />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    {...register("confirmPassword")}
                    className={`h-12 w-full rounded-lg border bg-white pl-11 pr-12 text-sm text-[#172033] outline-none transition placeholder:text-[#a0a9b8] ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                        : "border-[#d9dee7] focus:border-[#2563eb] focus:ring-4 focus:ring-blue-50"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#475569]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#cbd5e1] accent-[#2563eb]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-[#64748b]"
                >
                  I agree to the FlowForge{" "}
                  <a
                    href="#"
                    className="font-medium text-[#2563eb] hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-[#2563eb] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-8 text-center text-sm text-[#64748b]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#2563eb] hover:text-[#1d4ed8]"
              >
                Sign in
              </Link>
            </div>

            {/* Security */}
            <div className="mt-7 flex items-start gap-3 rounded-lg border border-[#e7ebf0] bg-[#f8fafc] p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#64748b]" />

              <p className="text-xs leading-5 text-[#64748b]">
                Your account session is protected using secure
                HTTP-only authentication cookies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function Benefit({
  icon: Icon,
  title,
  description,
}: BenefitProps) {
  return (
    <div className="flex gap-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#dce2ea] bg-white text-[#2563eb] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#273244]">
          {title}
        </h3>

        <p className="mt-1 max-w-md text-xs leading-5 text-[#64748b]">
          {description}
        </p>
      </div>
    </div>
  );
}