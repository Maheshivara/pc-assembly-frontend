"use client";
import { useConfiguration } from "@/hooks/configuration";
import { ConfigAbstract } from "../ConfigAbstract";
import { Configuration } from "@/types/domain/configuration";
import { MinimalUserConfigResponse } from "@/types/responses/configuration";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/16/solid";

interface ConfigViewDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  config: MinimalUserConfigResponse | null;
  name?: string;
}

export function ConfigViewDialog({
  open,
  onClose,
  onDelete,
  config,
  name,
}: ConfigViewDialogProps) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [configData, setConfigData] = useState<Configuration | null>(null);
  const fullConfig = useConfiguration.GetFullConfig(accessToken as string);
  const deleteConfig = useConfiguration.DeleteConfig(
    accessToken as string,
    session?.user?.email as string
  );

  useEffect(() => {
    if (config) {
      fullConfig.mutate(config, {
        onSuccess: (data) => {
          if (!data) {
            toast.error("Erro ao obter configuração completa.");
            return;
          }
          setConfigData(data);
        },
        onError: () => {
          toast.error("Erro ao obter configuração completa.");
        },
      });
    }
  }, [config]);

  const handleDownloadJson = () => {
    if (!configData) return;
    const json = JSON.stringify(configData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${name || "configuracao"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteConfig = () => {
    if (!config || !accessToken) return;
    deleteConfig.mutate(config.id, {
      onSuccess: () => {
        toast.success("Configuração excluída com sucesso.");
        onDelete(config.id);
        setConfigData(null);
        onClose();
      },
      onError: () => {
        toast.error("Erro ao excluir configuração.");
      },
    });
  };

  if (!open) return null;
  if (!config) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded shadow-lg">
          <p className="text-white">Nenhuma configuração para visualizar.</p>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg min-w-[350px]">
        <h2 className="text-lg font-bold mb-4">
          Visualizando Configuração {name}
        </h2>
        <ConfigAbstract config={configData} />
        <div className="mt-4 flex justify-end gap-2">
          {configData && (
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleDownloadJson}
            >
              Baixar JSON
            </button>
          )}
          {configData && (
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDeleteConfig}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
