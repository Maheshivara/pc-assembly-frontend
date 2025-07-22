import { login, register, refreshTokens, signOut } from "@/services/auth";

const Login = async (email: string, password: string) => {
  await login(email, password);
};

const Register = async (username: string, email: string, password: string) => {
  await register(username, email, password);
};

const Refresh = async (refreshToken?: string) => {
  if (!refreshToken) {
    return;
  }
  await refreshTokens(refreshToken);
};

const Logout = async () => {
  await signOut();
};

export const useAuth = {
  Login,
  Register,
  Refresh,
  Logout,
};
