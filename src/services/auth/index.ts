import { TokensResponse } from "@/types/responses/token";
import { userApi } from "../api";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { AuthErrorResponse } from "@/types/responses/error";
import { toast } from "react-toastify";

export async function register(
  username: string,
  email: string,
  password: string
): Promise<Boolean> {
  try {
    const response = await userApi.post<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<TokensResponse, AuthErrorResponse>
    >("/auth/register", { username, email, password });

    toast.success("Usuário registrado com sucesso.");
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      if (axiosError.response) {
        const { status } = axiosError.response;
        switch (status) {
          case 400:
            toast.error("Email já cadastrado ou dados inválidos.");
            return false;
          case 500:
            toast.error(
              "Erro interno do servidor. Tente novamente mais tarde."
            );
            return false;
          default:
            toast.error("Oops! Algo deu errado.");
            return false;
        }
      }
    }
    toast.error("Erro ao registrar usuário.");
    return false;
  }
}
