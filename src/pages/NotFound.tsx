import { Link, useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* Error Code */}
        <div className="mb-6">
          <span className="text-8xl font-bold tracking-tight text-slate-200">
            404
          </span>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <svg
              className="h-7 w-7 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          {/* Current Path */}
          <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Requested URL
            </p>

            <p className="mt-1 truncate text-sm font-medium text-slate-700">
              {location.pathname}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Go to Dashboard
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-slate-400">TaskFlow</p>
      </div>
    </div>
  );
};

export default NotFound;
