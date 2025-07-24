import { useRAMs } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { RAMComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { Configuration, SelectedRAM } from "@/types/domain/configuration";
import { RAMInfoPanel } from "../RAMInfoPanel";
import { toast } from "react-toastify";

export interface RAMChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function RAMChooser({
  setCanGoNext,
  setConfig,
  config,
}: RAMChooserProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useRAMs.GetManyRAMs(
    page,
    perPage,
    config?.motherboard?.memoryType || "DDR4",
    name
  );
  const [components, setComponents] = useState<RAMComponentResponse[]>([]);
  const [selectedRAMs, setSelectedRAMs] = useState<SelectedRAM[] | null>(
    config?.ram || null
  );
  useEffect(() => {
    if (
      config?.ram &&
      config?.ram?.[0]?.ram.type === config.motherboard?.memoryType
    ) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
      setSelectedRAMs(null);
    }
  }, [config?.ram, config?.motherboard?.memoryType, setCanGoNext]);

  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };

  const onAddOne = (mpn: string) => {
    if (!selectedRAMs) {
      return;
    }
    if (
      config?.motherboard?.memorySlots &&
      sumQuantity(selectedRAMs) >= config?.motherboard?.memorySlots
    ) {
      toast.error("Número máximo de slots de RAM atingido.");
      return;
    }
    const existing = selectedRAMs.find((item) => item.ram.mpn === mpn);
    if (existing) {
      const updatedRAMs = selectedRAMs.map((item) =>
        item.ram.mpn === mpn ? { ...item, quantity: item.quantity + 1 } : item
      );
      setSelectedRAMs(updatedRAMs);
      setConfig({
        ...config,
        ram: updatedRAMs,
      });
    }
  };
  const onRemoveOne = (mpn: string) => {
    if (!selectedRAMs) {
      return;
    }
    const existing = selectedRAMs.find((item) => item.ram.mpn === mpn);
    if (existing && existing.quantity > 1) {
      const updatedRAMs = selectedRAMs.map((item) =>
        item.ram.mpn === mpn ? { ...item, quantity: item.quantity - 1 } : item
      );
      setSelectedRAMs(updatedRAMs);
      setConfig({
        ...config,
        ram: updatedRAMs,
      });
    } else {
      setSelectedRAMs(selectedRAMs.filter((item) => item.ram.mpn !== mpn));
      setConfig({
        ...config,
        ram: selectedRAMs.filter((item) => item.ram.mpn !== mpn),
      });
      if (sumQuantity(selectedRAMs) === 1) {
        setCanGoNext(false);
      }
    }
  };

  const onDelete = (mpn: string) => {
    if (!selectedRAMs) {
      toast.error("Nenhum componente para remover.");
      return;
    }
    setSelectedRAMs(selectedRAMs.filter((item) => item.ram.mpn !== mpn));
    setConfig({
      ...config,
      ram: selectedRAMs.filter((item) => item.ram.mpn !== mpn),
    });
    if (sumQuantity(selectedRAMs) === 1) {
      setCanGoNext(false);
    }
  };

  const onSelect = (component: RAMComponentResponse) => {
    if (selectedRAMs?.some((item) => item.ram.mpn === component.mpn)) {
      toast.error("Componente já selecionado.");
      return;
    }
    if (
      config?.motherboard?.memorySlots &&
      sumQuantity(selectedRAMs) >= config?.motherboard?.memorySlots
    ) {
      toast.error("Número máximo de slots de RAM atingido.");
      return;
    }
    if (
      config?.motherboard?.memoryCapacity &&
      sumCapacity(selectedRAMs) + (component.capacity || 0) >
        config?.motherboard?.memoryCapacity
    ) {
      toast.error("Capacidade máxima de memória atingida.");
      return;
    }
    setConfig({
      ...config,
      ram: selectedRAMs
        ? [...selectedRAMs, { ram: component, quantity: 1 }]
        : [{ ram: component, quantity: 1 }],
    });
    setSelectedRAMs(
      selectedRAMs
        ? [...selectedRAMs, { ram: component, quantity: 1 }]
        : [{ ram: component, quantity: 1 }]
    );
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
          itemColor="var(--ram)"
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
        {selectedRAMs && (
          <RAMInfoPanel
            rams={selectedRAMs}
            onAddOne={onAddOne}
            onRemoveOne={onRemoveOne}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}

function sumCapacity(rams: SelectedRAM[] | null): number {
  if (!rams) return 0;
  return rams.reduce(
    (sum, item) => sum + (item.ram.capacity || 0) * item.quantity,
    0
  );
}

function sumQuantity(rams: SelectedRAM[] | null): number {
  if (!rams) return 0;
  return rams.reduce((sum, item) => sum + item.quantity, 0);
}
