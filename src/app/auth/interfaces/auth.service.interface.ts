import { ILogin } from '../interfaces/login.interface';
import { ISignup } from '../interfaces/signup.interface';

export interface IAuthService {
  setToken(token: string): void;
  isAuthenticated(): boolean;
  signup(dto: ISignup): Promise<void>;
  login(dto: ILogin): Promise<void>;
  logout(): Promise<void>;
}
