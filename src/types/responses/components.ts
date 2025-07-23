export type PagedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
};

export type CPUComponentResponse = {
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

export type CoolerComponentResponse = {
  mpn: string;
  name?: string;
  ean?: string;
  brand?: string;
  sockets?: string;
  tdp?: number;
  imageUrl?: string;
  productUrl?: string;
};

export type GPUComponentResponse = {
  mpn: string;
  name?: string;
  ean?: string;
  brand?: string;
  dp?: number;
  hdmi?: number;
  dvi?: number;
  vga?: number;
  vram?: number;
  boostClockSpeed?: number;
  memoryClockSpeed?: number;
  tdp?: number;
  sync?: string;
  imageUrl?: string;
  productUrl?: string;
};
