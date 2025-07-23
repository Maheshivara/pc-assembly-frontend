import { CoolerComponentResponse } from "@/types/responses/components";
import { ImageWithFallback } from "../ImageWithFallback";

type CoolerInfoPanelProps = {
  cooler: CoolerComponentResponse;
};

export function CoolerInfoPanel({ cooler }: CoolerInfoPanelProps) {
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
          {cooler.name || cooler.mpn}
        </h2>
        <ImageWithFallback
          key={cooler.ean || cooler.mpn}
          src={cooler.imageUrl || "/placeholder.svg"}
          alt={cooler.name || cooler.mpn}
          fallbackSrc="/placeholder.svg"
          width={200}
          height={200}
          className="w-full max-w-[200px] mb-4 block"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Brand:</strong> {cooler.brand || "N/A"}
        </li>
        <li>
          <strong>MPN:</strong> {cooler.mpn}
        </li>
        {cooler.ean && (
          <li>
            <strong>EAN:</strong> {cooler.ean}
          </li>
        )}
        {cooler.tdp !== undefined && (
          <li>
            <strong>TDP:</strong> {cooler.tdp} W
          </li>
        )}
        {cooler.sockets && (
          <li>
            <strong>Supported Sockets:</strong>{" "}
            {cooler.sockets
              .replaceAll("{", "")
              .replaceAll("}", "")
              .replaceAll(" ", "")
              .replaceAll('"', "")
              .replaceAll(",", ", ")}
          </li>
        )}
      </ul>
      {cooler.productUrl && (
        <a href={cooler.productUrl} target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </div>
  );
}
