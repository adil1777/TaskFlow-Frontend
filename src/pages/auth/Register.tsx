import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../../api/auth.api";
import type { RegisterFormData } from "../../types/auth";
import { registerSchema } from "../../utils/validations/registerSchema";


const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");

      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        organizationName: data.organizationName,
      });

      localStorage.setItem("accessToken", response.accessToken);

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("organizationId", response.organizationId);
      localStorage.setItem("role", response.role);

      navigate("/dashboard");
    } catch (error: any) {
      const details = error?.response?.data?.details;

      setServerError(
        details?.[0]?.message ||
          error?.response?.data?.error ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your TaskFlow account
          </p>
        </div>

        {serverError && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Organization Name
            </label>

            <input
              {...register("organizationName")}
              type="text"
              placeholder="Enter your organization name"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            />

            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-500"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-slate-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
