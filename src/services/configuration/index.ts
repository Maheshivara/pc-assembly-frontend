import { ConfigurationBody } from "@/types/body/configuration";
import {
  MinimalUserConfigResponse,
  UserConfigResponse,
} from "@/types/responses/configuration";
import { userApi } from "../api";
import { AxiosResponse } from "axios";
import { AuthErrorResponse } from "@/types/responses/error";
import { toast } from "react-toastify";
import { getCPUByMpn } from "../components/cpu";
import { getMotherboardByMpn } from "../components/motherboard";
import { getCoolerByMpn } from "../components/cooler";
import { getGPUByMpn } from "../components/gpu";
import { getPSUByMpn } from "../components/psu";
import { getRAMByMpn } from "../components/ram";
import { Configuration } from "@/types/domain/configuration";
import {
  PagedResponse,
  RAMComponentResponse,
  StorageComponentResponse,
} from "@/types/responses/components";
import { getStorageByMpn } from "../components/storage";

export async function saveConfig(
  config: ConfigurationBody,
  token: string
): Promise<UserConfigResponse | null> {
  try {
    console.log("Saving configuration:", config);
    const response = await userApi.post<
      any,
      AxiosResponse<UserConfigResponse, AuthErrorResponse>
    >("/configuration", config, {
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

export async function deleteConfig(
  configId: string,
  token: string
): Promise<boolean> {
  try {
    const response = await userApi.delete<
      any,
      AxiosResponse<void, AuthErrorResponse>
    >(`/configuration/${configId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting configuration:", error);
    return false;
  }
}

export async function listUserConfigs(
  page: number = 1,
  perPage: number = 10,
  token: string
): Promise<MinimalUserConfigResponse[]> {
  try {
    const response = await userApi.get<
      any,
      AxiosResponse<PagedResponse<MinimalUserConfigResponse>, AuthErrorResponse>
    >("/configuration", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        perPage,
      },
    });

    if (response.status === 200) {
      return response.data.items;
    } else {
      toast.error("Erro ao obter configurações.");
      return [];
    }
  } catch (error) {
    toast.error("Erro ao obter configurações");
    console.error("Error getting configurations:", error);
    return [];
  }
}

export async function getFullConfig(
  config: MinimalUserConfigResponse,
  token: string
): Promise<Configuration | null> {
  try {
    const configResponse = await userApi.get<
      any,
      AxiosResponse<UserConfigResponse, AuthErrorResponse>
    >(`/configuration/${config.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (configResponse.status !== 200) {
      toast.error("Erro ao obter configuração.");
      return null;
    }
    const configData = configResponse.data;
    const cpu = await getCPUByMpn(configData.cpuMpn);
    if (!cpu) {
      toast.error("Erro ao obter CPU.");
      return null;
    }

    const motherboard = await getMotherboardByMpn(configData.motherboardMpn);
    if (!motherboard) {
      toast.error("Erro ao obter Placa-Mãe.");
      return null;
    }

    const cpuFan = await getCoolerByMpn(configData.cpuFanMpn);
    if (!cpuFan) {
      toast.error("Erro ao obter Cooler.");
      return null;
    }

    const gpu = await getGPUByMpn(configData.gpuMpn);
    if (!gpu) {
      toast.error("Erro ao obter GPU.");
      return null;
    }

    const psu = await getPSUByMpn(configData.psuMpn);
    if (!psu) {
      toast.error("Erro ao obter Fonte.");
      return null;
    }

    const memories = await Promise.all(
      configData.memories.map(async (memory) => {
        const ram = await getRAMByMpn(memory.memoryMpn);
        if (!ram) {
          toast.error("Erro ao obter Memória RAM.");
          return null;
        }
        return { ram, quantity: memory.quantity };
      })
    );
    const filteredMemories = memories.filter((m) => m !== null) as {
      ram: RAMComponentResponse;
      quantity: number;
    }[];
    if (filteredMemories.length === 0) {
      toast.error("Nenhuma memória RAM válida encontrada.");
      return null;
    }

    const storages = await Promise.all(
      configData.storages.map(async (storage) => {
        const storageComponent = await getStorageByMpn(storage.storageMpn);
        if (!storageComponent) {
          toast.error("Erro ao obter Armazenamento.");
          return null;
        }
        return { storage: storageComponent, quantity: storage.quantity };
      })
    );
    const filteredStorages = storages.filter((s) => s !== null) as {
      storage: StorageComponentResponse;
      quantity: number;
    }[];
    if (filteredStorages.length === 0) {
      toast.error("Nenhum armazenamento válido encontrado.");
      return null;
    }
    return {
      id: config.id,
      name: config.name,
      cpu,
      cooler: cpuFan,
      gpu,
      motherboard,
      psu,
      ram: filteredMemories,
      storage: filteredStorages,
    };
  } catch (error) {
    toast.error("Erro ao obter configuração");
    console.error("Error getting configuration:", error);
    return null;
  }
}
