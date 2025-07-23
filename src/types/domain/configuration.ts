import {
  CPUComponentResponse,
  CoolerComponentResponse,
  GPUComponentResponse,
  MotherboardComponentResponse,
} from "../responses/components";

export type Configuration = {
  cpu?: CPUComponentResponse;
  cooler?: CoolerComponentResponse;
  gpu?: GPUComponentResponse;
  motherboard?: MotherboardComponentResponse;
};
