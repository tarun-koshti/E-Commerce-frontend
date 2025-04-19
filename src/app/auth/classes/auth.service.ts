import { RequestUtil } from '@/shared/utils/RequestUtil';
import { ILogin } from '../interfaces/login.interface';
import { ISignup } from '../interfaces/signup.interface';

export class AuthService {
  static baseUrl = '/authentication';

  static async signup(dto: ISignup) {
    return RequestUtil.post(`${AuthService.baseUrl}/signup`, dto);
  }

  static async login(dto: ILogin) {
    return RequestUtil.post(`${AuthService.baseUrl}/login`, dto);
  }
}
