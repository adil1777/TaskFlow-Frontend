import type { ReactNode } from "react";

interface ProjectMetadataProps {
  icon?: ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

const ProjectMetadata = ({
  icon,
  label,
  value,
  mono = false,
}: ProjectMetadataProps) => {
  return (
    <div
      className="
        rounded-lg
        bg-slate-50
        p-4

        dark:bg-slate-800/60
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-slate-500

          dark:text-slate-400
        "
      >
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p
        title={value}
        className={`
          mt-2
          truncate
          text-sm
          font-medium
          text-slate-900

          dark:text-slate-200

          ${mono ? "font-mono" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
};

export default ProjectMetadata;