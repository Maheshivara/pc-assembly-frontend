import {
  RAMComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listRAMs(
  page: number = 1,
  perPage: number = 10,
  type: string,
  name: string = ""
): Promise<RAMComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2
        ? { page, perPage, name, type }
        : { page, perPage, type };
    const response = await componentsApi.get<
      PagedResponse<RAMComponentResponse>
    >(`/memory`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching RAM components:", error);
    toast.error("Falha ao buscar componentes de RAM.");
    return null;
  }
}

export async function getRAMByMpn(mpn: string) {
  try {
    const encodedMpn = encodeURIComponent(mpn);
    const response = await componentsApi.get<RAMComponentResponse>(
      `/memory/${encodedMpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching RAM component:", error);
    toast.error("Falha ao buscar componente de RAM.");
    return null;
  }
}
