import { getCPUByMpn, listCPUs } from "@/services/components/cpu";
import { useQuery } from "@tanstack/react-query";

const queryKeys = {
  cpus: "qkCpus",
  gpus: "qkGpus",
  motherboards: "qkMotherboards",
  psus: "qkPsus",
  rams: "qkRams",
  storages: "qkStorages",
};

const GetMany = (page: number, perPage: number, name: string) => {
  return useQuery({
    queryKey: [queryKeys.cpus, page, perPage, name],
    queryFn: () => listCPUs(page, perPage, name),
  });
};

const GetOne = (mpn: string) => {
  return useQuery({
    queryKey: [queryKeys.cpus, "mpn", mpn],
    queryFn: () => getCPUByMpn(mpn),
  });
};

export const useCPUs = {
  GetMany,
  GetOne,
};
