import { Configuration } from "@/types/domain/configuration";

export interface ConfigAbstractProps {
  config: Configuration | null;
}

export function ConfigAbstract({ config }: ConfigAbstractProps) {
  if (!config) {
    return (
      <div className="text-gray-400 italic">
        Nenhuma configuração selecionada.
      </div>
    );
  }

  return (
    <div className="p-4 rounded bg-gray-800 text-white shadow">
      <h2 className="text-lg font-bold mb-2">Resumo da Configuração</h2>
      <ul className="space-y-1">
        <li>
          <strong>CPU:</strong>{" "}
          {config.cpu?.name || (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>Cooler:</strong>{" "}
          {config.cooler?.name || (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>GPU:</strong>{" "}
          {config.gpu?.name || (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>Placa-mãe:</strong>{" "}
          {config.motherboard?.name || (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>Fonte:</strong>{" "}
          {config.psu?.name || (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>RAM:</strong>{" "}
          {config.ram && config.ram.length > 0 ? (
            config.ram.map((r, i) => (
              <span key={i}>
                {r.quantity}x {r.ram.name || "RAM"}
                {config.ram && i < config.ram.length - 1 ? ", " : ""}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
        <li>
          <strong>Armazenamento:</strong>{" "}
          {config.storage !== undefined && config.storage.length > 0 ? (
            config.storage.map((s, i) => (
              <span key={i}>
                {s.quantity}x {s.storage.name || "Armazenamento"}
                {i < (config.storage?.length ?? 0) - 1 ? ", " : ""}
              </span>
            ))
          ) : (
            <span className="text-gray-400">Não selecionado</span>
          )}
        </li>
      </ul>
    </div>
  );
}
