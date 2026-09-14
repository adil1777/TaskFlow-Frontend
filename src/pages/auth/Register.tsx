import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { register as registerUser } from "../../api/auth.api";
import type { RegisterFormData } from "../../utils/types/auth";
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

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        organizationName: data.organizationName,
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please login.",
        },
      });
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
    <div
      className="
        flex h-screen
        items-center justify-center
        overflow-hidden
        bg-slate-50 px-4
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border border-slate-200
          bg-white p-5
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <div className="mb-5 text-center">
          <h1
            className="
              text-2xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            Create Account
          </h1>

          <p
            className="
              mt-1 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Create your TaskFlow account
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div
            className="
              mb-4 rounded-lg
              border border-red-200
              bg-red-50 px-3 py-2
              text-sm text-red-600
              dark:border-red-900/50
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label
              className="
                mb-1 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />

            {errors.name && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="
                mb-1 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />

            {errors.email && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Organization */}
          <div>
            <label
              className="
                mb-1 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Organization Name
            </label>

            <input
              {...register("organizationName")}
              type="text"
              placeholder="Enter your organization name"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />

            {errors.organizationName && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              className="
                mb-1 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Minimum 8 characters"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />

            {errors.password && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="
                mb-1 block text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Confirm Password
            </label>

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />

            {errors.confirmPassword && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full rounded-lg
              bg-slate-900 py-2
              text-sm font-medium text-white
              transition hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-200
            "
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p
          className="
            mt-4 text-center text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-medium
              text-slate-900
              hover:underline
              dark:text-white
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
