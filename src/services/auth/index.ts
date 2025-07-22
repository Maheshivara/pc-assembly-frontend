import { TokensResponse } from "@/types/responses/token";
import { userApi } from "../api";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { AuthErrorResponse } from "@/types/responses/error";
import { toast } from "react-toastify";
import { clearTokens, storeTokens } from "../utils";

export async function login(email: string, password: string) {
  try {
    console.log("Attempting to log in with email:", email);
    const response = await userApi.post<
      any,
      AxiosResponse<TokensResponse, AuthErrorResponse>
    >("auth/login", { email, password });

    const isSaved = await storeTokens(response.data);
    if (!isSaved) {
      toast.error("Erro ao salvar os tokens.");
      return;
    }
    toast.success("Login realizado com sucesso.");
    window.location.href = "/";
  } catch (error: any) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      if (axiosError.response) {
        const { status } = axiosError.response;
        switch (status) {
          case 400:
            toast.error("Algum dado invalido.");
            break;
          case 401:
            toast.error("Email ou senha incorretos.");
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
        return;
      }
    }
    toast.error("Erro ao fazer login.");
  }
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await userApi.post<
      any,
      AxiosResponse<TokensResponse, AuthErrorResponse>
    >("auth/register", { username, email, password });

    const isSaved = await storeTokens(response.data);
    if (!isSaved) {
      toast.error("Erro ao salvar os tokens.");
      return;
    }

    toast.success("Usuário registrado com sucesso.");
    window.location.href = "/";
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

export async function refreshTokens(refreshToken: string) {
  try {
    const response = await userApi.post<
      any,
      AxiosResponse<TokensResponse, AuthErrorResponse>
    >("auth/refresh", {
      token: refreshToken,
    });

    const isSaved = await storeTokens(response.data);
    if (!isSaved) {
      toast.error("Erro ao atualizar os tokens.");
      return;
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthErrorResponse>;
      if (axiosError.response) {
        const { status } = axiosError.response;
        switch (status) {
          case 400:
            toast.error("Token de atualização inválido.");
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
    await clearTokens();
    toast.error("Por favor, faça login novamente.");
    window.location.href = "/login";
  }
}

export async function signOut() {
  try {
    const isClear = await clearTokens();
    if (isClear) {
      toast.success("Logout realizado com sucesso.");
      window.location.href = "/";
    } else {
      toast.error("Erro ao realizar logout.");
    }
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    toast.error("Erro ao fazer logout.");
  }
}
