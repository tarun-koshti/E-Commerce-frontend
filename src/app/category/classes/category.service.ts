import { RequestUtil } from '@/shared/utils/RequestUtil';
import { ICreateCategory } from '../interfaces/create-category.interface';
import { IUpdateCategory } from '../interfaces/update-category.interface';

class _CategoryService {
  private readonly baseUrl = '/category';
  async createCategory(dto: ICreateCategory) {
    return RequestUtil.post(this.baseUrl, dto);
  }

  async getAllCategories() {
    return RequestUtil.get(this.baseUrl);
  }

  async getCategoryById(id: string) {
    return RequestUtil.get(`${this.baseUrl}/${id}`);
  }

  async updateCategory(id: string, dto: IUpdateCategory) {
    return RequestUtil.patch(`${this.baseUrl}/${id}`, dto);
  }

  async deleteCategory(id: string) {
    return RequestUtil.delete(`${this.baseUrl}/${id}`);
  }
}

export const CategoryService = new _CategoryService();
