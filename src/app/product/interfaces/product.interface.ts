export interface IProduct {
  _id?: string;
  category: string;
  shop: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive?: boolean;
}
