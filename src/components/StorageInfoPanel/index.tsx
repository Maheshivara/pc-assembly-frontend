import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { ImageWithFallback } from "../ImageWithFallback";
import { SelectedStorage } from "@/types/domain/configuration";

type StorageInfoPanelProps = {
  storages: SelectedStorage[];
  onAddOne: (mpn: string) => void;
  onRemoveOne: (mpn: string) => void;
  onDelete: (mpn: string) => void;
};

export function StorageInfoPanel({
  storages,
  onAddOne,
  onRemoveOne,
  onDelete,
}: StorageInfoPanelProps) {
  return (
    <div className="w-full p-4">
      {storages.map((item) => (
        <div
          key={(item.storage.ean || item.storage.mpn) + item.storage.capacity}
          className="flex items-center justify-between mb-2"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <div className="flex items-center">
            <ImageWithFallback
              key={item.storage.ean || item.storage.mpn}
              src={item.storage.imageUrl || "/placeholder.svg"}
              fallbackSrc="/placeholder.svg"
              width={48}
              height={48}
              alt={item.storage.name || item.storage.mpn}
              className="w-12 h-12 mr-2"
            />
            <div className="flex flex-col">
              <span className="text-sm">
                {item.storage.name || item.storage.mpn}
              </span>
              <div className="flex flex-wrap">
                {item.storage.capacity && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.storage.capacity} GB
                  </span>
                )}
                {item.storage.brand && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.storage.brand}
                  </span>
                )}
                {item.storage.protocol && (
                  <span className="text-xs text-gray-500 mr-2">
                    {item.storage.protocol}
                  </span>
                )}
                {item.storage.formFactor && (
                  <span className="text-xs text-gray-500">
                    {item.storage.formFactor}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => onRemoveOne(item.storage.mpn)}
              className="btn btn-secondary mx-2"
              aria-label="Remove one"
              type="button"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onAddOne(item.storage.mpn)}
              className="btn btn-primary mx-2"
              aria-label="Add one"
              type="button"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(item.storage.mpn)}
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
