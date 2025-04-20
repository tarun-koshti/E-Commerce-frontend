export interface IShop {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    isPrimary: boolean;
  };
  owner: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
