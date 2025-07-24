"use client";
import { useConfiguration } from "@/hooks/configuration";
import { MinimalUserConfigResponse } from "@/types/responses/configuration";
import { EyeIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { ConfigViewDialog } from "../ConfigViewDialog";

export function ConfigList() {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const { data: session } = useSession();
  const [configs, setConfigs] = useState<MinimalUserConfigResponse[]>([]);
  const accessToken = session?.user?.accessToken;
  const { data } = useConfiguration.ListAll(
    page,
    perPage,
    session?.user?.accessToken as string,
    session?.user?.email as string
  );
  useEffect(() => {
    if (data) {
      setConfigs((prevConfigs) => prevConfigs.concat(data));
    }
  }, [page, data]);

  const onEnd = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const onDelete = (id: string) => {
    setConfigs((prevConfigs) =>
      prevConfigs.filter((config) => config.id !== id)
    );
  };

  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        onEnd();
      }
    };
    const ul = listRef.current;
    if (ul) {
      ul.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ul) {
        ul.removeEventListener("scroll", handleScroll);
      }
    };
  }, [configs, onEnd]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] =
    useState<MinimalUserConfigResponse | null>(null);

  const handleViewConfig = (config: MinimalUserConfigResponse) => {
    setSelectedConfig(config);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!accessToken || session === undefined) {
    return (
      <div className="text-center text-red-500">
        Você precisa estar logado para acessar as configurações.
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Minhas Configurações
      </h2>
      {configs.length === 0 ? (
        <div className="text-center text-gray-500">
          Nenhuma configuração salva.
        </div>
      ) : (
        <ul className="space-y-4">
          {configs.map((config) => (
            <li key={config.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{config.name}</h3>
              <button onClick={() => handleViewConfig(config)}>
                <EyeIcon className="h-5 w-5 text-gray-500" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <ConfigViewDialog
          open={isModalOpen}
          onClose={handleCloseModal}
          onDelete={onDelete}
          config={selectedConfig}
          name={selectedConfig?.name || "Configuração"}
        />
      )}
    </div>
  );
}
