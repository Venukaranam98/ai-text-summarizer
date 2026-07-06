import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";
import type { TokenApiResponse, UserCredentials } from "../../types/auth";

export const loginUserMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: UserCredentials) =>
      loginUser(email, password),
    onSuccess: (data: TokenApiResponse) => {
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;

      localStorage.setItem(
        "ai-text-summarizer-tokens",
        JSON.stringify({ accessToken, refreshToken }),
      );

      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
