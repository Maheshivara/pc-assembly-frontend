export type Configuration = {
  cpu?: CPUConfiguration;
};

export type CPUConfiguration = {
  mpn: string;
  name?: string;
  ean?: string;
  brand?: string;
  cores?: number;
  threads?: number;
  speed?: number;
  turboSpeed?: number;
  tdp?: number;
  socket?: string;
  graphics?: string;
  imageUrl?: string;
  productUrl?: string;
};
