import { useCPUs } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { CPUComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { CPUInfoPanel } from "../CPUInfoPanel";
import { Configuration } from "@/types/domain/configuration";

export interface CPUChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function CPUChooser({
  setCanGoNext,
  setConfig,
  config,
}: CPUChooserProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useCPUs.GetManyCPUs(page, perPage, name);
  const [components, setComponents] = useState<CPUComponentResponse[]>([]);
  const [selectedCpu, setSelectedCpu] = useState<CPUComponentResponse | null>(
    config?.cpu || null
  );
  useEffect(() => {
    if (config?.cpu) {
      setCanGoNext(true);
    }
  }, [config?.cpu, setCanGoNext]);
  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };
  const onSelect = (component: CPUComponentResponse) => {
    setConfig({
      ...config,
      cpu: component,
    });
    setSelectedCpu(component);
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
        {selectedCpu && <CPUInfoPanel cpu={selectedCpu} />}
      </div>
    </div>
  );
}
