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
