import {
  StorageComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listStorages(
  page: number = 1,
  perPage: number = 10,
  name: string = ""
): Promise<StorageComponentResponse[] | null> {
  try {
    const params =
      name.trim().length > 2 ? { page, perPage, name } : { page, perPage };
    const response = await componentsApi.get<
      PagedResponse<StorageComponentResponse>
    >(`storage`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching Storage components:", error);
    toast.error("Falha ao buscar componentes de Storage.");
    return null;
  }
}

export async function getStorageByMpn(mpn: string) {
  try {
    const response = await componentsApi.get<StorageComponentResponse>(
      `storage/${mpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching CPU component:", error);
    toast.error("Falha ao buscar componente de CPU.");
    return null;
  }
}
