import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/auth.api";

import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { login: saveAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      saveAuth(
        response.data.accessToken,
        response.data.user,
        response.data.organization.id,
        response.data.organization.role,
        response.data.refreshToken
      );

      navigate("/dashboard");
    } catch (error: any) {
      const details =
        error?.response?.data?.details;

      setError(
        details?.[0]?.message ||
          error?.response?.data?.error ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-slate-50 px-4
        dark:bg-slate-950
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border border-slate-200
          bg-white p-8
          shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="mb-8 text-center">
          <h1
            className="
              text-3xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              mt-2 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Sign in to your TaskFlow account
          </p>
        </div>

        {error && (
          <div
            className="
              mb-5 rounded-lg
              border border-red-200
              bg-red-50 px-4 py-3
              text-sm text-red-600
              dark:border-red-900/50
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
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
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-4 py-2.5
                text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
              required
            />
          </div>

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
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Minimum 8 characters"
              className="
                w-full rounded-lg
                border border-slate-300
                bg-white px-4 py-2.5
                text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-slate-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-slate-500
              "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg
              bg-slate-900 py-2.5
              font-medium text-white
              transition hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-200
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <p
          className="
            mt-6 text-center text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              font-medium
              text-slate-900
              hover:underline
              dark:text-white
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;