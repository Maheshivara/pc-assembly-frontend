import { useMotherboards } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { MotherboardComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { Configuration } from "@/types/domain/configuration";
import { MoBoInfoPanel } from "../MoBoInfoPanel";

export interface MoBoChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function MoBoChooser({
  setCanGoNext,
  setConfig,
  config,
}: MoBoChooserProps) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const perPage = 10;
  const { data: pageComponents } = useMotherboards.GetManyMotherboards(
    page,
    perPage,
    config?.cpu?.mpn || "",
    name
  );
  const [components, setComponents] = useState<MotherboardComponentResponse[]>(
    []
  );
  const [selectedMoBo, setSelectedMoBo] =
    useState<MotherboardComponentResponse | null>(config?.motherboard || null);
  useEffect(() => {
    if (config?.motherboard) {
      setCanGoNext(true);
    }
  }, [config?.motherboard, setCanGoNext]);
  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      return;
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };

  const onSelect = (component: MotherboardComponentResponse) => {
    setConfig({
      ...config,
      motherboard: component,
    });
    setSelectedMoBo(component);
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
          itemColor="var(--motherboard)"
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
        {selectedMoBo && <MoBoInfoPanel motherboard={selectedMoBo} />}
      </div>
    </div>
  );
}
