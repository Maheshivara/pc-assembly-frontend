import { getUser } from "@/services/user";

const Info = (accessToken?: string) => {
  const user = getUser(accessToken);
  return user;
};

export const useUser = {
  Info,
};
