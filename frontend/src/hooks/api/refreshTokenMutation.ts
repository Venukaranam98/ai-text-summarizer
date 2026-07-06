import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshToken } from "../../api/auth";
import type { TokenApiResponse } from "../../types/auth";

export const refreshTokenMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: refreshToken,
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
