import {
  MotherboardComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listMotherboards(
  page: number = 1,
  perPage: number = 10,
  cpuMpn: string,
  name: string = ""
): Promise<MotherboardComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2
        ? { page, perPage, name, cpuMpn }
        : { page, perPage, cpuMpn };
    const response = await componentsApi.get<
      PagedResponse<MotherboardComponentResponse>
    >(`motherboard`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching motherboard components:", error);
    toast.error("Falha ao buscar componentes de motherboard.");
    return null;
  }
}

export async function getMotherboardByMpn(mpn: string) {
  try {
    const response = await componentsApi.get<MotherboardComponentResponse>(
      `motherboard/${mpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching motherboard component:", error);
    toast.error("Falha ao buscar componente de motherboard.");
    return null;
  }
}
