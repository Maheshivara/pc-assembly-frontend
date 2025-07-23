import { usePSUs } from "@/hooks/components";
import { ComponentsList } from "../ComponentsList";
import { useEffect, useState } from "react";
import { PSUComponentResponse } from "@/types/responses/components";
import { SearchBar } from "../SearchBar";
import { Configuration } from "@/types/domain/configuration";
import { PSUInfoPanel } from "../PSUInfoPanel";
import { toast } from "react-toastify";

export interface PSUChooserProps {
  setCanGoNext: (value: boolean) => void;
  config: Configuration | null;
  setConfig: (config: Configuration) => void;
}

export function PSUChooser({
  setCanGoNext,
  setConfig,
  config,
}: PSUChooserProps) {
  const minPower = (config?.cpu?.tdp || 0) + (config?.gpu?.tdp || 0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [getUncertain, setGetUncertain] = useState(false);
  const perPage = 10;
  const { data: pageComponents } = usePSUs.GetManyPSUs(
    page,
    perPage,
    minPower,
    config?.motherboard?.formFactor || "ATX",
    name,
    getUncertain
  );
  const [components, setComponents] = useState<PSUComponentResponse[]>([]);
  const [selectedPSU, setSelectedPSU] = useState<PSUComponentResponse | null>(
    config?.psu || null
  );
  useEffect(() => {
    if (config?.psu && config?.psu?.type === config.motherboard?.formFactor) {
      setCanGoNext(true);
    } else {
      setCanGoNext(false);
      setSelectedPSU(null);
    }
  }, [config?.psu, config?.motherboard?.formFactor, setCanGoNext]);

  const onSearch = (query: string) => {
    if (query.trim().length < 3) {
      query = "";
    }
    setName(query);
    setPage(1);
    setComponents([]);
  };

  const onSelect = (component: PSUComponentResponse) => {
    if (!component.power) {
      toast.warning("Fonte de alimentação com potência incerta.");
    } else if (component.power * 0.75 < minPower) {
      toast.warning(
        `Fonte de alimentação com potência abaixo do recomendado (${
          minPower / 0.75
        }W).`
      );
    }

    setConfig({
      ...config,
      psu: component,
    });
    setSelectedPSU(component);
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
        <button
          className="mt-2 px-4 py-2 rounded text-sm justify-center text-white"
          style={{
            backgroundColor: getUncertain
              ? "var(--button-login)"
              : "var(--button-logout)",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              getUncertain
                ? "var(--button-login-hover)"
                : "var(--button-logout-hover)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              getUncertain ? "var(--button-login)" : "var(--button-logout)";
          }}
          onClick={() => {
            setGetUncertain((prev) => !prev);
            setPage(1);
            setComponents([]);
          }}
        >
          {getUncertain ? "Esconder PSUs incertos" : "Mostrar PSUs incertos"}
        </button>
      </div>
      <div
        style={{
          minWidth: 320,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedPSU && <PSUInfoPanel psu={selectedPSU} />}
      </div>
    </div>
  );
}
