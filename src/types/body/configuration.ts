export type ConfigurationBody = {
  name: string;
  cpuMpn: string;
  cpuFanMpn: string;
  gpuMpn: string;
  motherboardMpn: string;
  psuMpn: string;
  memories: ConfigBodyMemory[];
  storages?: ConfigBodyStorage[];
};

type ConfigBodyMemory = {
  quantity: number;
  memoryMpn: string;
};

type ConfigBodyStorage = {
  storageMpn: string;
  quantity: number;
};
