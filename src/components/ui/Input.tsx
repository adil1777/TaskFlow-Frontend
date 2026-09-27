import type {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "w-full rounded-lg border bg-white px-3 py-2.5",
          "text-sm text-slate-900",
          "outline-none transition",
          "placeholder:text-slate-400",
          "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
          error
            ? "border-red-500"
            : "border-slate-300",
          className,
        ].join(" ")}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;