import { getCoolerByMpn, listCoolers } from "@/services/components/cooler";
import { getCPUByMpn, listCPUs } from "@/services/components/cpu";
import { getGPUByMpn, listGPUs } from "@/services/components/gpu";
import { useQuery } from "@tanstack/react-query";

const queryKeys = {
  cpus: "qkCpus",
  gpus: "qkGpus",
  coolers: "qkCoolers",
  motherboards: "qkMotherboards",
  psus: "qkPsus",
  rams: "qkRams",
  storages: "qkStorages",
};

const GetManyCPUs = (page: number, perPage: number, name: string) => {
  return useQuery({
    queryKey: [queryKeys.cpus, page, perPage, name],
    queryFn: () => listCPUs(page, perPage, name),
  });
};

const GetOneCPU = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.cpus, "mpn", mpn],
    queryFn: () => getCPUByMpn(mpn),
  });
};

export const useCPUs = {
  GetManyCPUs,
  GetOneCPU,
};

const GetManyCoolers = (
  page: number,
  perPage: number,
  cpuMpn: string,
  name: string = ""
) => {
  return useQuery({
    queryKey: [queryKeys.coolers, page, perPage, cpuMpn, name],
    queryFn: () => listCoolers(page, perPage, cpuMpn, name),
  });
};

const GetOneCooler = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.coolers, "mpn", mpn],
    queryFn: () => getCoolerByMpn(mpn),
  });
};

export const useCoolers = {
  GetManyCoolers,
  GetOneCooler,
};

const GetManyGPUs = (page: number, perPage: number, name: string) => {
  return useQuery({
    queryKey: [queryKeys.gpus, page, perPage, name],
    queryFn: () => listGPUs(page, perPage, name),
  });
};

const GetOneGPU = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.gpus, "mpn", mpn],
    queryFn: () => getGPUByMpn(mpn),
  });
};

export const useGPUs = {
  GetManyGPUs,
  GetOneGPU,
};
