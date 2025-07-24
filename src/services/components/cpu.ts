import {
  CPUComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listCPUs(
  page: number = 1,
  perPage: number = 10,
  name: string = ""
): Promise<CPUComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2 ? { page, perPage, name } : { page, perPage };
    const response = await componentsApi.get<
      PagedResponse<CPUComponentResponse>
    >(`/cpu`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching CPU components:", error);
    toast.error("Falha ao buscar componentes de CPU.");
    return null;
  }
}

export async function getCPUByMpn(mpn: string) {
  try {
    const encodedMpn = encodeURIComponent(mpn);
    const response = await componentsApi.get<CPUComponentResponse>(
      `/cpu/${encodedMpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching CPU component:", error);
    toast.error("Falha ao buscar componente de CPU.");
    return null;
  }
}
