import { useMutation } from "@tanstack/react-query";

import {
  registerApi,
} from "../../api/auth.api";
import type { RegisterPayload } from "../../utils/types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: (
      payload: RegisterPayload
    ) => registerApi(payload),
  });
};