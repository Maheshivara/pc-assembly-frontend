import { useGPUs } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { GPUComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { GPUInfoPanel } from "../GPUInfoPanel";
import { Configuration } from "@/types/domain/configuration";

export interface GPUChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function GPUChooser({
  setCanGoNext,
  setConfig,
  config,
}: GPUChooserProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useGPUs.GetManyGPUs(page, perPage, name);
  const [components, setComponents] = useState<GPUComponentResponse[]>([]);
  const [selectedGpu, setSelectedGpu] = useState<GPUComponentResponse | null>(
    config?.gpu || null
  );
  useEffect(() => {
    if (config?.gpu || config?.cpu?.graphics !== "none") {
      setCanGoNext(true);
    }
  }, [config?.gpu, setCanGoNext, config?.cpu?.graphics]);

  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };
  const onSelect = (component: GPUComponentResponse) => {
    setConfig({
      ...config,
      gpu: component,
    });
    setSelectedGpu(component);
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
          itemColor="var(--gpu)"
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
        {selectedGpu && <GPUInfoPanel gpu={selectedGpu} />}
      </div>
    </div>
  );
}
