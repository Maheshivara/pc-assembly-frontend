import { ConfigurationBody } from "@/types/body/configuration";
import { UserConfigResponse } from "@/types/responses/configuration";
import { userApi } from "../api";
import { AxiosResponse } from "axios";
import { AuthErrorResponse } from "@/types/responses/error";
import { toast } from "react-toastify";

export async function saveConfig(
  config: ConfigurationBody,
  token: string
): Promise<UserConfigResponse | null> {
  try {
    const response = await userApi.post<
      any,
      AxiosResponse<UserConfigResponse, AuthErrorResponse>
    >("configuration", config, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      toast.success("Configuração salva com sucesso!");
      return response.data;
    } else {
      toast.error("Erro ao salvar configuração.");
      return null;
    }
  } catch (error) {
    toast.error("Erro ao salvar configuração");
    console.error("Error saving configuration:", error);
    return null;
  }
}
