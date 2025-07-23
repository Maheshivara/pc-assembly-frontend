import { PSUComponentResponse } from "@/types/responses/components";
import React from "react";
import { ImageWithFallback } from "../ImageWithFallback";

type PSUInfoPanelProps = {
  psu: PSUComponentResponse;
};

export function PSUInfoPanel({ psu }: PSUInfoPanelProps) {
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
          {psu.name || psu.mpn}
        </h2>

        <ImageWithFallback
          key={psu.ean || psu.mpn}
          src={psu.imageUrl || "/placeholder.svg"}
          fallbackSrc="/placeholder.svg"
          alt={psu.name || psu.mpn}
          width={200}
          height={200}
          className="w-full max-w-[200px] mb-4 block"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Brand:</strong> {psu.brand || "N/A"}
        </li>
        <li>
          <strong>MPN:</strong> {psu.mpn}
        </li>
        {psu.ean && (
          <li>
            <strong>EAN:</strong> {psu.ean}
          </li>
        )}
        {psu.power && (
          <li>
            <strong>Power:</strong> {psu.power} W
          </li>
        )}
        {psu.type && (
          <li>
            <strong>Form Factor:</strong> {psu.type}
          </li>
        )}
        {psu.efficiency && (
          <li>
            <strong>Efficiency Rating:</strong> {psu.efficiency}
          </li>
        )}
      </ul>
      {psu.productUrl && (
        <a href={psu.productUrl} target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </div>
  );
}
