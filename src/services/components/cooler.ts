import {
  CPUComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listCoolers(
  page: number = 1,
  perPage: number = 10,
  cpuMpn: string,
  name: string = ""
): Promise<CPUComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2
        ? { page, perPage, cpuMpn, name }
        : { page, perPage, cpuMpn };
    const response = await componentsApi.get<
      PagedResponse<CPUComponentResponse>
    >(`/cooler`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Cooler components:", error);
    toast.error("Falha ao buscar componentes de Cooler.");
    return null;
  }
}

export async function getCoolerByMpn(mpn: string) {
  try {
    const encodedMpn = encodeURIComponent(mpn);
    const response = await componentsApi.get<CPUComponentResponse>(
      `/cooler/${encodedMpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Cooler component:", error);
    toast.error("Falha ao buscar componente de Cooler.");
    return null;
  }
}
