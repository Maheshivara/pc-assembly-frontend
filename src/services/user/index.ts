import { UserResponse } from "@/types/responses/user";

export function getUser(token?: string): null | UserResponse {
  if (!token) {
    return null;
  }

  const user = JSON.parse(atob(token.split(".")[1]));

  if (!user) {
    return null;
  }

  if (!user.exp || !user.username || !user.email || !user.id) {
    return null;
  }

  if (user.exp * 1000 < Date.now()) {
    return null;
  }

  const info: UserResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return info;
}
