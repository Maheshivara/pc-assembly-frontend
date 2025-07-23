import { GPUComponentResponse } from "@/types/responses/components";

import { ImageWithFallback } from "../ImageWithFallback";

type GPUInfoPanelProps = {
  gpu: GPUComponentResponse;
};

export function GPUInfoPanel({ gpu }: GPUInfoPanelProps) {
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
          {gpu.name || gpu.mpn}
        </h2>

        <ImageWithFallback
          key={gpu.ean || gpu.mpn}
          src={gpu.imageUrl || "/placeholder.svg"}
          fallbackSrc="/placeholder.svg"
          alt={gpu.name || gpu.mpn}
          width={200}
          height={200}
          className="w-full max-w-[200px] mb-4 block"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Brand:</strong> {gpu.brand || "N/A"}
        </li>
        <li>
          <strong>MPN:</strong> {gpu.mpn}
        </li>
        {gpu.ean && (
          <li>
            <strong>EAN:</strong> {gpu.ean}
          </li>
        )}
        {gpu.vram !== undefined && (
          <li>
            <strong>VRAM:</strong> {gpu.vram} GB
          </li>
        )}
        {gpu.boostClockSpeed !== undefined && (
          <li>
            <strong>Boost Clock Speed:</strong>{" "}
            {gpu.boostClockSpeed < 1000
              ? gpu.boostClockSpeed * 1000 + " MHz"
              : gpu.boostClockSpeed + " MHz"}
          </li>
        )}
        {gpu.memoryClockSpeed !== undefined && (
          <li>
            <strong>Memory Clock Speed:</strong>{" "}
            {gpu.memoryClockSpeed < 1000
              ? gpu.memoryClockSpeed * 1000 + " MHz"
              : gpu.memoryClockSpeed + " MHz"}
          </li>
        )}
        {gpu.tdp !== undefined && (
          <li>
            <strong>TDP:</strong> {gpu.tdp} W
          </li>
        )}
        {(gpu.dp !== undefined ||
          gpu.dvi !== undefined ||
          gpu.hdmi !== undefined ||
          gpu.vga !== undefined) && (
          <li>
            <strong>Ports:</strong>
            <ul style={{ listStyle: "disc", marginLeft: 20 }}>
              {gpu.dp !== undefined && <li>DisplayPort: {gpu.dp}</li>}
              {gpu.dvi !== undefined && <li>DVI: {gpu.dvi}</li>}
              {gpu.hdmi !== undefined && <li>HDMI: {gpu.hdmi}</li>}
              {gpu.vga !== undefined && <li>VGA: {gpu.vga}</li>}
            </ul>
          </li>
        )}
      </ul>
      {gpu.productUrl && (
        <a href={gpu.productUrl} target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </div>
  );
}
