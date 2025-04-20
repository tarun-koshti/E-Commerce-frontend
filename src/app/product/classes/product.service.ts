import { RequestUtil } from '@/shared/utils/RequestUtil';
import { IProduct } from '../interfaces/product.interface';

export class ProductService {
  private static readonly BASE_URL = '/product';
  private static readonly TOKEN_KEY = 'token';

  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? { authorization: `Bearer ${token}` } : {};
  }

  static async getAllProducts(): Promise<IProduct[]> {
    return RequestUtil.get<IProduct[]>(this.BASE_URL);
  }

  static async getProductById(id: string): Promise<IProduct> {
    return RequestUtil.get<IProduct>(`${this.BASE_URL}/${id}`);
  }

  static async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    return RequestUtil.post<IProduct>(this.BASE_URL, productData, this.getAuthHeaders());
  }

  static async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct> {
    return RequestUtil.patch<IProduct>(`${this.BASE_URL}/${id}`, productData, this.getAuthHeaders());
  }

  static async deleteProduct(id: string): Promise<void> {
    return RequestUtil.delete(`${this.BASE_URL}/${id}`, this.getAuthHeaders());
  }
}
