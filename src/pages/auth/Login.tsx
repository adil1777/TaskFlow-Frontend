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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      saveAuth(
        response.accessToken,
        response.user,
        response.organizationId,
        response.role,
        response.refreshToken
      );

      navigate("/dashboard");
    } catch (error: any) {
       const details = error?.response?.data?.details;

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">TaskFlow</h1>

        <p className="mt-2 text-slate-500">Sign in to your account</p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
