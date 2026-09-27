import { useMutation } from "@tanstack/react-query";

import {
  loginApi,
} from "../../api/auth.api";
import type { LoginPayload } from "../../utils/types/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (
      payload: LoginPayload
    ) => loginApi(payload),
  });
};