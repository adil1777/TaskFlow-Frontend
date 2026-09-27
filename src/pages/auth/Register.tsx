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
import { useRegister } from "../../hooks/auth/useRegister";
import type { RegisterFormData } from "../../utils/types/auth";
import { registerSchema } from "../../utils/validations/authSchema";

const Register = () => {
  const navigate = useNavigate();

  const registerMutation =
    useRegister();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      organizationName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: RegisterFormData
  ) => {
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      navigate("/login", {
        replace: true,
      });
    } catch {
      // Server error UI will be added
      // in the next refinement.
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Create your account
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Start managing your organization
          with TaskFlow.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          id="name"
          label="Full name"
          placeholder="Mohd Adil"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

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
          id="organizationName"
          label="Organization"
          placeholder="Acme Inc."
          error={
            errors.organizationName
              ?.message
          }
          {...register(
            "organizationName"
          )}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={
            errors.password?.message
          }
          {...register("password")}
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={
            errors.confirmPassword
              ?.message
          }
          {...register(
            "confirmPassword"
          )}
        />

        <Button
          type="submit"
          loading={
            registerMutation.isPending
          }
        >
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;