import type {
  ButtonHTMLAttributes,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex w-full items-center justify-center",
        "rounded-lg px-4 py-2.5",
        "text-sm font-semibold text-white",
        "bg-indigo-600",
        "transition hover:bg-indigo-700",
        "focus:outline-none focus:ring-2",
        "focus:ring-indigo-500/30",
        "disabled:cursor-not-allowed",
        "disabled:opacity-60",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Please wait...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;