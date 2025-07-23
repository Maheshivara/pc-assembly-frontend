import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { ImageWithFallback } from "../ImageWithFallback";
import { SelectedRAM } from "@/types/domain/configuration";

type RAMInfoPanelProps = {
  rams: SelectedRAM[];
  onAddOne: (mpn: string) => void;
  onRemoveOne: (mpn: string) => void;
  onDelete: (mpn: string) => void;
};

export function RAMInfoPanel({
  rams,
  onAddOne,
  onRemoveOne,
  onDelete,
}: RAMInfoPanelProps) {
  return (
    <div className="w-full p-4">
      {rams.map((item) => (
        <div
          key={
            (item.ram.ean || item.ram.mpn) +
            item.ram.clockSpeed +
            item.ram.capacity
          }
          className="flex items-center justify-between mb-2"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <div className="flex items-center">
            <ImageWithFallback
              key={item.ram.ean || item.ram.mpn}
              src={item.ram.imageUrl || "/placeholder.svg"}
              fallbackSrc="/placeholder.svg"
              width={48}
              height={48}
              alt={item.ram.name || item.ram.mpn}
              className="w-12 h-12 mr-2"
            />
            <div className="flex flex-col">
              <span className="text-sm">{item.ram.name || item.ram.mpn}</span>
              <div className="flex flex-wrap">
                {item.ram.capacity && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.ram.capacity} GB
                  </span>
                )}
                {item.ram.clockSpeed && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.ram.clockSpeed} MHz
                  </span>
                )}
                {item.ram.type && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.ram.type}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onAddOne(item.ram.mpn)}
              className="btn btn-primary mr-2"
              aria-label="Add one"
              type="button"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onRemoveOne(item.ram.mpn)}
              className="btn btn-secondary mx-2"
              aria-label="Remove one"
              type="button"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(item.ram.mpn)}
              className="btn btn-danger"
              aria-label="Delete"
              type="button"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
