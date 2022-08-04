export interface Product {
  id?: string;
  title?: string;
  thumbnail?: string;
  price?: number;
  stock?: number;
  timestamp?: number;
}
export interface Products {
  [index: string]: Array<Product>;
}
