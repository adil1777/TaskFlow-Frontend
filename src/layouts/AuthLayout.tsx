import {
  Outlet,
} from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        <section className="hidden lg:flex items-center justify-center bg-slate-900 p-12">
          <div className="max-w-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                T
              </div>

              <span className="text-xl font-semibold text-white">
                TaskFlow
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-white">
              Manage projects,
              <br />
              tasks and teams
              <br />
              in one place.
            </h1>

            <p className="mt-6 text-base leading-7 text-slate-400">
              A production-oriented project
              management workspace built for
              organizations and teams.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </section>

      </div>
    </main>
  );
};

export default AuthLayout;