import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogin } from "../../hooks/auth/useLogin";
import { LoginSchema } from "../../utils/validations/authSchema";
import type { LoginFormData } from "../../utils/types/auth";

const Login = () => {
  const navigate = useNavigate();

  const {
    login: saveSession,
  } = useAuth();

  const loginMutation =
    useLogin();

  const [serverError, setServerError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: LoginFormData
  ) => {
    setServerError(null);

    try {
      const response =
        await loginMutation.mutateAsync(
          values
        );

      saveSession({
        accessToken:
          response.accessToken,

        refreshToken:
          response.refreshToken,

        user: response.user,
      });

      /*
       * Organization selection will be
       * handled by Module 3.
       */
      navigate(
        "/organizations",
        { replace: true }
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Invalid email or password.";

      setServerError(message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Sign in to your TaskFlow account.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={
            errors.password?.message
          }
          {...register("password")}
        />

        <Button
          type="submit"
          loading={
            loginMutation.isPending
          }
        >
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default Login;