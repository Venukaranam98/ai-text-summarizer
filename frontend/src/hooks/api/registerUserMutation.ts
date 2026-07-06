import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";
import type { UserCredentials } from "../../types/auth";

export const registerUserMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: UserCredentials) =>
      registerUser(email, password),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
