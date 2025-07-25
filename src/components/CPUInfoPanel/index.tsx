import { CPUComponentResponse } from "@/types/responses/components";

import { ImageWithFallback } from "../ImageWithFallback";

type CPUInfoPanelProps = {
  cpu: CPUComponentResponse;
};

export function CPUInfoPanel({ cpu }: CPUInfoPanelProps) {
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
          {cpu.name || cpu.mpn}
        </h2>

        <ImageWithFallback
          key={cpu.ean || cpu.mpn}
          src={cpu.imageUrl || "/placeholder.svg"}
          fallbackSrc="/placeholder.svg"
          alt={cpu.name || cpu.mpn}
          width={200}
          height={200}
          className="w-full max-w-[200px] mb-4 block"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Brand:</strong> {cpu.brand || "N/A"}
        </li>
        <li>
          <strong>MPN:</strong> {cpu.mpn}
        </li>
        {cpu.ean && (
          <li>
            <strong>EAN:</strong> {cpu.ean}
          </li>
        )}
        {cpu.cores !== undefined && (
          <li>
            <strong>Cores:</strong> {cpu.cores}
          </li>
        )}
        {cpu.threads !== undefined && (
          <li>
            <strong>Threads:</strong> {cpu.threads}
          </li>
        )}
        {cpu.speed !== undefined && (
          <li>
            <strong>Base Speed:</strong> {cpu.speed} GHz
          </li>
        )}
        {cpu.turboSpeed !== undefined && (
          <li>
            <strong>Turbo Speed:</strong> {cpu.turboSpeed} GHz
          </li>
        )}
        {cpu.tdp !== undefined && (
          <li>
            <strong>TDP:</strong> {cpu.tdp} W
          </li>
        )}
        {cpu.socket && (
          <li>
            <strong>Socket:</strong> {cpu.socket}
          </li>
        )}
        {cpu.graphics && (
          <li>
            <strong>Graphics:</strong> {cpu.graphics}
          </li>
        )}
      </ul>
      {cpu.productUrl && (
        <a href={cpu.productUrl} target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </div>
  );
}
