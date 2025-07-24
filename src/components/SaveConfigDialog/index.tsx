import { useConfiguration } from "@/hooks/configuration";
import { ConfigurationBody } from "@/types/body/configuration";
import { Configuration } from "@/types/domain/configuration";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export interface SaveConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config: Configuration | null;
}

export function SaveConfigDialog({
  isOpen,
  onClose,
  config,
}: SaveConfigDialogProps) {
  const [name, setName] = useState("");
  const { data: session } = useSession();
  if (!isOpen) return null;
  if (!session || session.user.accessToken === undefined) {
    toast.error("Você precisa estar logado para salvar uma configuração.");
    return null;
  }
  const handleSave = async () => {
    const body = configToBody(config, name);
    if (!body) {
      toast.error("Configuração incompleta. Verifique os componentes.");
      return;
    }
    const response = await useConfiguration.SaveConfig(
      body,
      session.user.accessToken as string
    );
    if (response) {
      onClose();
    }
  };

  if (!config) {
    toast.error("Nenhuma configuração para salvar.");
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Salvar Configuração</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
            setName("");
            onClose();
          }}
        >
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <p>Você deseja salvar a configuração atual?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function configToBody(
  config: Configuration | null,
  name: string
): ConfigurationBody | null {
  if (!config) return null;
  if (
    !config.cpu ||
    !config.motherboard ||
    !config.psu ||
    !config.ram ||
    !config.storage ||
    !config.gpu ||
    !config.cooler
  ) {
    return null;
  }

  return {
    name,
    cpuMpn: config.cpu.mpn,
    cpuFanMpn: config.cooler.mpn,
    motherboardMpn: config.motherboard.mpn,
    psuMpn: config.psu.mpn,
    gpuMpn: config.gpu.mpn,
    memories: config.ram.map((r) => ({
      memoryMpn: r.ram.mpn,
      quantity: r.quantity,
    })),
    storages: config.storage.map((s) => ({
      storageMpn: s.storage.mpn,
      quantity: s.quantity,
    })),
  };
}
