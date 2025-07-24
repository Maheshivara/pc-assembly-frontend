import {
  CPUComponentResponse,
  CoolerComponentResponse,
  GPUComponentResponse,
  MotherboardComponentResponse,
  PSUComponentResponse,
  RAMComponentResponse,
  StorageComponentResponse,
} from "../responses/components";

export type Configuration = {
  id?: string;
  name?: string;
  cpu?: CPUComponentResponse;
  cooler?: CoolerComponentResponse;
  gpu?: GPUComponentResponse;
  motherboard?: MotherboardComponentResponse;
  psu?: PSUComponentResponse;
  ram?: SelectedRAM[];
  storage?: SelectedStorage[];
};

export type SelectedRAM = {
  ram: RAMComponentResponse;
  quantity: number;
};

export type SelectedStorage = {
  storage: StorageComponentResponse;
  quantity: number;
};
