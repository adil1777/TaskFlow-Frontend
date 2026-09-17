import api from "./axios";

import type { Member } from "../utils/types/member";

export const getMembers = async (): Promise<Member[]> => {
  const response = await api.get("/members");

  return response.data;
};