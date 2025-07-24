import { saveConfig } from "@/services/configuration";
import { ConfigurationBody } from "@/types/body/configuration";
import { UserConfigResponse } from "@/types/responses/configuration";

const SaveConfig = async (
  config: ConfigurationBody,
  accessToken: string
): Promise<UserConfigResponse | null> => {
  const response = await saveConfig(config, accessToken);
  return response;
};

export const useConfiguration = {
  SaveConfig,
};
