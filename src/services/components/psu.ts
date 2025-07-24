import {
  PSUComponentResponse,
  PagedResponse,
} from "@/types/responses/components";
import { componentsApi } from "../api";
import { toast } from "react-toastify";

export async function listPSUs(
  page: number = 1,
  perPage: number = 10,
  power: number,
  type: string = "ATX",
  name: string = "",
  getUncertain: boolean = false
): Promise<PSUComponentResponse[] | null> {
  let myType = "ATX";
  if (type.includes("SFX-L")) {
    myType = "SFX-L";
  } else if (type.includes("TFX")) {
    myType = "TFX";
  } else if (type.includes("SFX")) {
    myType = "SFX";
  } else if (type.includes("ITX")) {
    myType = "ITX";
  }
  try {
    const params =
      name.trim().length > 2
        ? { page, perPage, name, power, getUncertain, type: myType }
        : { page, perPage, power, getUncertain, type: myType };
    const response = await componentsApi.get<
      PagedResponse<PSUComponentResponse>
    >(`psu`, {
      params,
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching PSU components:", error);
    toast.error("Falha ao buscar componentes de PSU.");
    return null;
  }
}

export async function getPSUByMpn(mpn: string) {
  try {
    const response = await componentsApi.get<PSUComponentResponse>(
      `psu/${mpn}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PSU component:", error);
    toast.error("Falha ao buscar componente de PSU.");
    return null;
  }
}
