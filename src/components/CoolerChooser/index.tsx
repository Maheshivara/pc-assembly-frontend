import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { Configuration } from "@/types/domain/configuration";
import { useCoolers } from "@/hooks/components";
import { CoolerComponentResponse } from "@/types/responses/components";
import { CoolerInfoPanel } from "../CoolerInfoPanel";

export interface CPUChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function CoolerChooser({
  setCanGoNext,
  setConfig,
  config,
}: CPUChooserProps) {
  useEffect(() => {
    if (
      config?.cooler &&
      config?.cpu?.socket &&
      config.cooler.sockets?.includes(config.cpu.socket)
    ) {
      setCanGoNext(true);
    } else {
      setSelectedCooler(null);
    }
  }, [config?.cooler, config?.cpu?.socket, setCanGoNext]);

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useCoolers.GetManyCoolers(
    page,
    perPage,
    config?.cpu?.mpn || "",
    name
  );
  const [components, setComponents] = useState<CoolerComponentResponse[]>([]);
  const [selectedCooler, setSelectedCooler] =
    useState<CoolerComponentResponse | null>(config?.cooler || null);

  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };

  const onSelect = (component: CoolerComponentResponse) => {
    setConfig({
      ...config,
      cooler: component,
    });
    setSelectedCooler(component);
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

  if (!config?.cpu) {
    return <div className="text-red-500">Selecione uma CPU primeiro.</div>;
  }
  return (
    <div
      className="flex flex-row gap-4"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="flex-1 flex flex-col gap-2">
        <SearchBar onSearch={onSearch} />
        <ComponentsList
          itemColor="var(--cpu)"
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
        {selectedCooler && <CoolerInfoPanel cooler={selectedCooler} />}
      </div>
    </div>
  );
}
