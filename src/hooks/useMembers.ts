import { useQuery } from "@tanstack/react-query";

import { getMembers } from "../api/member.api";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    staleTime: 5 * 60 * 1000,
  });
};