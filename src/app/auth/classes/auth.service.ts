import { RequestUtil } from '@/shared/utils/RequestUtil';
import { IAuthService } from '../interfaces/auth.service.interface';
import { ILogin } from '../interfaces/login.interface';
import { ISignup } from '../interfaces/signup.interface';

class _AuthService implements IAuthService {
  private readonly baseUrl = '/authentication';
  private readonly tokenKey = 'token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  async signup(dto: ISignup) {
    const response = (await RequestUtil.post(`${this.baseUrl}/signup`, dto)) as { access_token: string };
    if (response && response.access_token) {
      this.setToken(response.access_token);
    }
  }

  async login(dto: ILogin) {
    const response = (await RequestUtil.post(`${this.baseUrl}/login`, dto)) as { access_token: string };
    if (response && response.access_token) {
      this.setToken(response.access_token);
    }
  }

  async logout() {
    const token = this.isAuthenticated();
    if (token) {
      localStorage.removeItem(this.tokenKey);
    }
  }
}

export const AuthService = new _AuthService();
