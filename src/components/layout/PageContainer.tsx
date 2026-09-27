import type {
  ReactNode,
} from "react";

import Breadcrumbs from "./Breadcrumbs";

interface PageContainerProps {
  children: ReactNode;
  breadcrumbs?: boolean;
}

const PageContainer = ({
  children,
  breadcrumbs = true,
}: PageContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {breadcrumbs && (
        <Breadcrumbs />
      )}

      {children}
    </div>
  );
};

export default PageContainer;