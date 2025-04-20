export let is_authenticated = false;

export class TokenService {
  private static readonly TOKEN_KEY = "token";
  static setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated() {
    const token = this.getToken();
    is_authenticated = token ? true : false;
    return token ? true : false;
  }
}
