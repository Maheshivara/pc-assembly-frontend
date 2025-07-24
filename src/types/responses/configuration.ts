export type UserConfigResponse = {
  id: string;
  name: string;
  description: string;
  motherboardMpn: string;
  cpuMpn: string;
  gpuMpn: string;
  psuMpn: string;
  cpuFanMpn: string;
  memories: ConfigMemory[];
  storages: ConfigStorage[];
  history: ConfigHistory[];
};

type ConfigMemory = {
  id: string;
  memoryMpn: string;
  quantity: number;
};

type ConfigStorage = {
  id: string;
  storageMpn: string;
  quantity: number;
};

type ConfigHistory = {
  id: string;
  action: string;
  date: Date;
};

export type MinimalUserConfigResponse = {
  id: string;
  name: string;
};
