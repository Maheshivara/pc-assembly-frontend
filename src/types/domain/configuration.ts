import {
  CPUComponentResponse,
  CoolerComponentResponse,
  GPUComponentResponse,
  MotherboardComponentResponse,
  PSUComponentResponse,
} from "../responses/components";

export type Configuration = {
  cpu?: CPUComponentResponse;
  cooler?: CoolerComponentResponse;
  gpu?: GPUComponentResponse;
  motherboard?: MotherboardComponentResponse;
  psu?: PSUComponentResponse;
};
