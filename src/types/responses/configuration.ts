export type UserConfigResponse = {
  id: string;
  motherboardMpn: string;
  cpuMpn: string;
  gpuMpn: string;
  psuMpn: string;
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
