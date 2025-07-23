import {
  CPUComponentResponse,
  CoolerComponentResponse,
  GPUComponentResponse,
} from "../responses/components";

export type Configuration = {
  cpu?: CPUComponentResponse;
  cooler?: CoolerComponentResponse;
  gpu?: GPUComponentResponse;
};
