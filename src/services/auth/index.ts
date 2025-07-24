import { TokensResponse } from "@/types/responses/token";
import { userApi } from "../api";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { AuthErrorResponse } from "@/types/responses/error";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await userApi.post<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<TokensResponse, AuthErrorResponse>
    >("auth/register", { username, email, password });

    toast.success("Usuário registrado com sucesso.");
    await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      if (axiosError.response) {
        const { status } = axiosError.response;
        switch (status) {
          case 400:
            toast.error("Email já cadastrado ou dados inválidos.");
            break;
          case 500:
            toast.error(
              "Erro interno do servidor. Tente novamente mais tarde."
            );
            break;
          default:
            toast.error("Oops! Algo deu errado.");
            break;
        }
      }
    }
    toast.error("Erro ao registrar usuário.");
  }
}
