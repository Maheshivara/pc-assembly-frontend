import { register } from "@/services/auth";

const Register = async (username: string, email: string, password: string) => {
  await register(username, email, password);
};

export const useAuth = {
  Register,
};
