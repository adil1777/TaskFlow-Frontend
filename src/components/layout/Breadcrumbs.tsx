import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  ChevronRight,
} from "lucide-react";

const Breadcrumbs = () => {
  const location =
    useLocation();

  const segments =
    location.pathname
      .split("/")
      .filter(Boolean);

  if (!segments.length) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center gap-1.5 overflow-x-auto text-sm"
    >
      <Link
        to="/organizations"
        className="shrink-0 text-slate-500 hover:text-slate-900"
      >
        Organizations
      </Link>

      {segments
        .slice(1)
        .map(
          (segment, index) => {
            const path =
              `/${segments
                .slice(
                  0,
                  index + 2
                )
                .join("/")}`;

            const isLast =
              index ===
              segments.length - 2;

            const label =
              segment
                .replace(
                  /-/g,
                  " "
                )
                .replace(
                  /\b\w/g,
                  (char) =>
                    char.toUpperCase()
                );

            return (
              <span
                key={path}
                className="flex shrink-0 items-center gap-1.5"
              >
                <ChevronRight
                  size={15}
                  className="text-slate-300"
                />

                {isLast ? (
                  <span className="font-medium text-slate-800">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="text-slate-500 hover:text-slate-900"
                  >
                    {label}
                  </Link>
                )}
              </span>
            );
          }
        )}
    </nav>
  );
};

export default Breadcrumbs;