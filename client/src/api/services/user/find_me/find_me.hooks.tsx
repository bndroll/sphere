import { useQuery } from "@tanstack/react-query";
import { TelegramAuthRequest } from "@/api/services/auth/auth.types";
import { getProfileQueryOpts } from "@/api/services/auth/auth";

export const useAuth = (request: TelegramAuthRequest) => {
  return useQuery(getProfileQueryOpts(request, undefined));
};
