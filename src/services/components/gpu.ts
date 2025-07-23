import {
  GPUComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listGPUs(
  page: number = 1,
  perPage: number = 10,
  name: string = ""
): Promise<GPUComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2 ? { page, perPage, name } : { page, perPage };
    const response = await componentsApi.get<
      PagedResponse<GPUComponentResponse>
    >(`gpu`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching GPU components:", error);
    toast.error("Falha ao buscar componentes de GPU.");
    return null;
  }
}

export async function getGPUByMpn(mpn: string) {
  try {
    const response = await componentsApi.get<GPUComponentResponse>(
      `/gpu/${mpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GPU component:", error);
    toast.error("Falha ao buscar componente de GPU.");
    return null;
  }
}
