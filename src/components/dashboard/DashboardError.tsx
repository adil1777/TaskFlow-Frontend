interface DashboardErrorProps {
  onRetry: () => void;
}

const DashboardError = ({ onRetry }: DashboardErrorProps) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <h2 className="font-semibold text-red-800">Unable to load dashboard</h2>

      <p className="mt-1 text-sm text-red-600">
        Something went wrong while fetching dashboard data.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
      >
        Try Again
      </button>
    </div>
  );
};

export default DashboardError;
