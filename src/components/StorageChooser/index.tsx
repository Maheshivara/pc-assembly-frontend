import { useStorages } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { StorageComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { Configuration, SelectedStorage } from "@/types/domain/configuration";
import { StorageInfoPanel } from "../StorageInfoPanel";
import { toast } from "react-toastify";

export interface StorageChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function StorageChooser({
  setCanGoNext,
  setConfig,
  config,
}: StorageChooserProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useStorages.GetManyStorages(
    page,
    perPage,
    name
  );
  const [components, setComponents] = useState<StorageComponentResponse[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<
    SelectedStorage[] | null
  >(config?.storage || null);

  useEffect(() => {
    if (
      config?.storage &&
      config?.storage?.[0]?.storage.type === config.motherboard?.memoryType
    ) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
      setSelectedStorages(null);
    }
  }, [config?.storage, config?.motherboard?.memoryType, setCanGoNext]);

  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };

  const onAddOne = (mpn: string) => {
    if (!selectedStorages) {
      return;
    }
    const sataSlots = config?.motherboard?.sataSlots || 0;
    const m2Slots =
      (config?.motherboard?.m2PCI3Slots || 0) +
      (config?.motherboard?.m2PCI4Slots || 0);
    const existing = selectedStorages.find((item) => item.storage.mpn === mpn);
    if (existing) {
      if (
        sataSlots > 0 &&
        existing.storage.protocol === "SATA" &&
        sumQuantity(selectedStorages, "SATA") >= sataSlots
      ) {
        toast.error("Número máximo de slots SATA atingido.");
        return;
      } else {
        if (
          m2Slots > 0 &&
          sumQuantity(selectedStorages, "M.2") + 1 >= m2Slots
        ) {
          toast.error("Numero máximo de slots M.2 atingido.");
          return;
        }
      }
      setSelectedStorages(
        selectedStorages.map((item) =>
          item.storage.mpn === mpn
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const onRemoveOne = (mpn: string) => {
    if (!selectedStorages) {
      return;
    }
    const existing = selectedStorages.find((item) => item.storage.mpn === mpn);
    if (existing && existing.quantity > 1) {
      const updatedStorages = selectedStorages.map((item) =>
        item.storage.mpn === mpn
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setSelectedStorages(updatedStorages);
      setConfig({
        ...config,
        storage: updatedStorages,
      });
    } else {
      setSelectedStorages(
        selectedStorages.filter((item) => item.storage.mpn !== mpn)
      );
      setConfig({
        ...config,
        storage: selectedStorages.filter((item) => item.storage.mpn !== mpn),
      });
      if (
        sumQuantity(selectedStorages, "SATA") +
          sumQuantity(selectedStorages, "M.2") ===
        1
      ) {
        setCanGoNext(false);
      }
    }
  };

  const onDelete = (mpn: string) => {
    if (!selectedStorages) {
      toast.error("Nenhum componente para remover.");
      return;
    }
    setSelectedStorages(
      selectedStorages.filter((item) => item.storage.mpn !== mpn)
    );
    setConfig({
      ...config,
      storage: selectedStorages.filter((item) => item.storage.mpn !== mpn),
    });
    if (
      sumQuantity(selectedStorages, "SATA") +
        sumQuantity(selectedStorages, "M.2") ===
      1
    ) {
      setCanGoNext(false);
    }
  };

  const onSelect = (component: StorageComponentResponse) => {
    if (selectedStorages?.some((item) => item.storage.mpn === component.mpn)) {
      toast.error("Componente já selecionado.");
      return;
    }
    const sataSlots = config?.motherboard?.sataSlots || 0;
    const m2Slots =
      (config?.motherboard?.m2PCI3Slots || 0) +
      (config?.motherboard?.m2PCI4Slots || 0);
    if (
      sataSlots > 0 &&
      component.protocol === "SATA" &&
      sumQuantity(selectedStorages, "SATA") >= sataSlots
    ) {
      toast.error("Número máximo de slots SATA atingido.");
      return;
    } else if (
      m2Slots > 0 &&
      (component.protocol === "M.2" || component.formFactor === "M.2") &&
      sumQuantity(selectedStorages, "M.2") >= m2Slots
    ) {
      console.log("Selected motherboard:", config?.motherboard);
      toast.error("Número máximo de slots M.2 atingido.");
      return;
    }
    const updatedStorages = selectedStorages
      ? [...selectedStorages, { storage: component, quantity: 1 }]
      : [{ storage: component, quantity: 1 }];
    setConfig({
      ...config,
      storage: updatedStorages,
    });
    setSelectedStorages(updatedStorages);
    setCanGoNext(true);
  };

  useEffect(() => {
    if (pageComponents) {
      setComponents((prev) =>
        page === 1 ? pageComponents : [...prev, ...pageComponents]
      );
    }
  }, [pageComponents, page]);

  const onEnd = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      className="flex flex-row gap-4"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="flex-1 flex flex-col gap-2">
        <SearchBar onSearch={onSearch} />
        <ComponentsList
          itemColor="var(--storage)"
          components={components}
          onSelect={onSelect}
          onEnd={onEnd}
        />
      </div>
      <div
        style={{
          minWidth: 320,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedStorages && (
          <StorageInfoPanel
            storages={selectedStorages}
            onAddOne={onAddOne}
            onRemoveOne={onRemoveOne}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

function sumQuantity(
  rams: SelectedStorage[] | null,
  formFactor: "SATA" | "M.2"
): number {
  if (!rams) return 0;
  return rams.reduce((sum, item) => {
    if (item.storage.formFactor === formFactor) {
      return sum + item.quantity;
    }
    return sum;
  }, 0);
}
