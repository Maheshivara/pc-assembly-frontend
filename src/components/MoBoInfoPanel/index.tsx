import { MotherboardComponentResponse } from "@/types/responses/components";

import { ImageWithFallback } from "../ImageWithFallback";

type MoBoInfoPanelProps = {
  motherboard: MotherboardComponentResponse;
};

export function MoBoInfoPanel({ motherboard }: MoBoInfoPanelProps) {
  return (
    <div
      style={{
        border: "1px solid var(--foreground)",
        borderRadius: 8,
        padding: 16,
        maxWidth: 400,
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
          {motherboard.name || motherboard.mpn}
        </h2>

        <ImageWithFallback
          key={motherboard.ean || motherboard.mpn}
          src={motherboard.imageUrl || "/placeholder.svg"}
          fallbackSrc="/placeholder.svg"
          alt={motherboard.name || motherboard.mpn}
          width={200}
          height={200}
          className="w-full max-w-[200px] mb-4 block"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Brand:</strong> {motherboard.brand || "N/A"}
        </li>
        <li>
          <strong>MPN:</strong> {motherboard.mpn}
        </li>
        {motherboard.ean && (
          <li>
            <strong>EAN:</strong> {motherboard.ean}
          </li>
        )}
        {motherboard.socket && (
          <li>
            <strong>Socket:</strong> {motherboard.socket}
          </li>
        )}
        {motherboard.formFactor && (
          <li>
            <strong>Form Factor:</strong> {motherboard.formFactor}
          </li>
        )}
        {motherboard.chipset && (
          <li>
            <strong>Chipset:</strong> {motherboard.chipset}
          </li>
        )}
        {(motherboard.memoryCapacity ||
          motherboard.memorySlots ||
          motherboard.memoryType) && (
          <li>
            <strong>Memory:</strong>
            <ul style={{ listStyle: "disc", marginLeft: 20 }}>
              {motherboard.memoryCapacity && (
                <li>Max Supported: {motherboard.memoryCapacity}</li>
              )}
              {motherboard.memorySlots && (
                <li>Slots: {motherboard.memorySlots}</li>
              )}
              {motherboard.memoryType && (
                <li>Type: {motherboard.memoryType}</li>
              )}
            </ul>
          </li>
        )}
        {(motherboard.dp !== undefined ||
          motherboard.dvi !== undefined ||
          motherboard.hdmi !== undefined ||
          motherboard.vga !== undefined) && (
          <li>
            <strong>Ports:</strong>
            <ul style={{ listStyle: "disc", marginLeft: 20 }}>
              {motherboard.dp !== undefined && (
                <li>DisplayPort: {motherboard.dp}</li>
              )}
              {motherboard.dvi !== undefined && <li>DVI: {motherboard.dvi}</li>}
              {motherboard.hdmi !== undefined && (
                <li>HDMI: {motherboard.hdmi}</li>
              )}
              {motherboard.vga !== undefined && <li>VGA: {motherboard.vga}</li>}
            </ul>
          </li>
        )}
      </ul>
      {motherboard.productUrl && (
        <a
          href={motherboard.productUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Product
        </a>
      )}
    </div>
  );
}
