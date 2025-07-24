import {
  deleteConfig,
  getFullConfig,
  listUserConfigs,
  saveConfig,
} from "@/services/configuration";
import { ConfigurationBody } from "@/types/body/configuration";
import { MinimalUserConfigResponse } from "@/types/responses/configuration";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "userConfigs";

const SaveConfig = (token: string, userEmail: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: ConfigurationBody) =>
      await saveConfig(config, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, { userEmail: userEmail }],
      });
    },
  });
};

const ListAll = (
  page: number = 1,
  perPage: number = 10,
  accessToken: string,
  userEmail: string
) => {
  return useQuery({
    queryKey: [QUERY_KEY, { page, perPage, userEmail }],
    queryFn: async () => {
      const data = await listUserConfigs(page, perPage, accessToken);
      return data;
    },
    enabled: !!accessToken,
  });
};

const GetFullConfig = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: MinimalUserConfigResponse) =>
      await getFullConfig(config, token),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      queryClient.setQueryData([QUERY_KEY, { configId: data.id }], data);
    },
  });
};

const DeleteConfig = (token: string, userEmail: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (configId: string) => {
      const response = await deleteConfig(configId, token);
      if (response) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY, { userEmail: userEmail }],
        });
      }
    },
  });
};

export const useConfiguration = {
  SaveConfig,
  ListAll,
  GetFullConfig,
  DeleteConfig,
};
