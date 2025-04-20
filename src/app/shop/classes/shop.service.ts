import { RequestUtil } from '@/shared/utils/RequestUtil';
import { IShop } from '../interfaces/shop.interface';

export class ShopService {
  private static readonly BASE_URL = '/shops';
  private static readonly TOKEN_KEY = 'token';

  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? { authorization: `Bearer ${token}` } : {};
  }

  static async getAllShops(): Promise<IShop[]> {
    return RequestUtil.get<IShop[]>(this.BASE_URL);
  }

  static async getShopById(id: string): Promise<IShop> {
    return RequestUtil.get<IShop>(`${this.BASE_URL}/${id}`);
  }

  static async createShop(shopData: Partial<IShop>): Promise<IShop> {
    return RequestUtil.post<IShop>(this.BASE_URL, shopData, this.getAuthHeaders());
  }

  static async updateShop(id: string, shopData: Partial<IShop>): Promise<IShop> {
    return RequestUtil.patch<IShop>(`${this.BASE_URL}/${id}`, shopData, this.getAuthHeaders());
  }

  static async deleteShop(id: string): Promise<void> {
    return RequestUtil.delete(`${this.BASE_URL}/${id}`, this.getAuthHeaders());
  }
}
