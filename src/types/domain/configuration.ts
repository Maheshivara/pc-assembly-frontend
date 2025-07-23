import {
  CPUComponentResponse,
  CoolerComponentResponse,
  GPUComponentResponse,
  MotherboardComponentResponse,
  PSUComponentResponse,
  RAMComponentResponse,
} from "../responses/components";

export type Configuration = {
  cpu?: CPUComponentResponse;
  cooler?: CoolerComponentResponse;
  gpu?: GPUComponentResponse;
  motherboard?: MotherboardComponentResponse;
  psu?: PSUComponentResponse;
  ram?: SelectedRAM[];
};

export type SelectedRAM = {
  ram: RAMComponentResponse;
  quantity: number;
};
