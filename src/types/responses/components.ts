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

export type MotherboardComponentResponse = {
  mpn: string;
  name?: string;
  brand?: string;
  ean?: string;
  upc?: string;
  socket?: string;
  chipset?: string;
  formFactor?: string;
  memoryType?: string;
  memoryCapacity?: number;
  memorySlots?: number;
  memorySpeed?: string;
  sataSlots?: number;
  m2PCI3Slots?: number;
  m2PCI4Slots?: number;
  extensionPCI3x1?: number;
  extensionPCI3x4?: number;
  extensionPCI3x8?: number;
  extensionPCI3x16?: number;
  extensionPCI4x1?: number;
  extensionPCI4x4?: number;
  extensionPCI4x8?: number;
  extensionPCI4x16?: number;
  usb3Slots?: number;
  usb3Headers?: number;
  usb3CSlots?: number;
  vga?: number;
  dvi?: number;
  dp?: number;
  hdmi?: number;
  wifi?: string;
  graphics?: string;
  imageUrl?: string;
  productUrl?: string;
};

export type PSUComponentResponse = {
  mpn: string;
  name?: string;
  ean?: string;
  brand?: string;
  power?: number;
  efficiency?: string;
  type?: string;
  eightPin?: number;
  sixPin?: number;
  imageUrl?: string;
  productUrl?: string;
};
