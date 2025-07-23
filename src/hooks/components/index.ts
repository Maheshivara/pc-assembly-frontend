import { getCoolerByMpn, listCoolers } from "@/services/components/cooler";
import { getCPUByMpn, listCPUs } from "@/services/components/cpu";
import { getGPUByMpn, listGPUs } from "@/services/components/gpu";
import {
  getMotherboardByMpn,
  listMotherboards,
} from "@/services/components/motherboard";
import { getPSUByMpn, listPSUs } from "@/services/components/psu";
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

const GetManyMotherboards = (
  page: number,
  perPage: number,
  cpuMpn: string,
  name: string = ""
) => {
  return useQuery({
    queryKey: [queryKeys.motherboards, page, perPage, cpuMpn, name],
    queryFn: () => listMotherboards(page, perPage, cpuMpn, name),
  });
};

const GetOneMotherboard = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.motherboards, "mpn", mpn],
    queryFn: () => getMotherboardByMpn(mpn),
  });
};

export const useMotherboards = {
  GetManyMotherboards,
  GetOneMotherboard,
};

const GetManyPSUs = (
  page: number,
  perPage: number,
  power: number,
  type: string,
  name: string = "",
  getUncertain: boolean = false
) => {
  return useQuery({
    queryKey: [queryKeys.psus, page, perPage, power, type, name, getUncertain],
    queryFn: () => listPSUs(page, perPage, power, type, name, getUncertain),
  });
};

const GetOnePSU = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.psus, "mpn", mpn],
    queryFn: () => getPSUByMpn(mpn),
  });
};

export const usePSUs = {
  GetManyPSUs,
  GetOnePSU,
};
