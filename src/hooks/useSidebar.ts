import { useCallback, useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleSidebar,
    closeSidebar,
  };
};