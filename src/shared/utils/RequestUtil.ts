'use client';
import axios, { AxiosError } from 'axios';

export class RequestUtil {
  private static readonly baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || '';
  private static defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private static async catchAxios(error: unknown): Promise<never> {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data || error.message;
      throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } else {
      throw error;
    }
  }

  private static prepareHeaders(headers: Record<string, string>): Record<string, string> {
    return { ...this.defaultHeaders, ...headers };
  }

  static mergePaths(prefix: string, suffix: string): string {
    return `${prefix}${suffix.startsWith('/') ? '' : '/'}${suffix}`;
  }

  static async get<T>(
    url: string,
    query?: Record<string, string | number | boolean | null>,
    headers: Record<string, string> = {},
  ): Promise<T> {
    try {
      const queryString = query ? `?${new URLSearchParams(query as Record<string, string>).toString()}` : '';
      url = `${this.baseUrl}${url}${queryString}`;
      return (
        await axios.get(url, {
          headers: this.prepareHeaders(headers),
        })
      ).data;
    } catch (error) {
      return this.catchAxios(error);
    }
  }

  static async post<T>(url: string, data: unknown, headers: Record<string, string> = {}): Promise<T> {
    try {
      return (
        await axios.post(`${this.baseUrl}${url}`, data, {
          headers: this.prepareHeaders(headers),
        })
      ).data;
    } catch (error) {
      return this.catchAxios(error);
    }
  }

  static async put<T>(url: string, data: unknown, headers: Record<string, string> = {}): Promise<T> {
    try {
      return (
        await axios.put(`${this.baseUrl}${url}`, data, {
          headers: this.prepareHeaders(headers),
        })
      ).data;
    } catch (error) {
      return this.catchAxios(error);
    }
  }

  static async patch<T>(url: string, data: unknown, headers: Record<string, string> = {}): Promise<T> {
    try {
      return (
        await axios.patch(`${this.baseUrl}${url}`, data, {
          headers: this.prepareHeaders(headers),
        })
      ).data;
    } catch (error) {
      return this.catchAxios(error);
    }
  }

  static async delete<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    try {
      return (
        await axios.delete(`${this.baseUrl}${url}`, {
          headers: this.prepareHeaders(headers),
        })
      ).data;
    } catch (error) {
      return this.catchAxios(error);
    }
  }
}
