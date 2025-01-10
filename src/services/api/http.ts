/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomFetchConfig } from "@/constant/type";

export class ApiClient {
  private host: string;
  private prefix: string;
  private headers: Record<string, string>;

  constructor(host: string, prefix: string = "") {
    this.host = host;
    this.prefix = prefix;
    this.headers = {
      Accept: "application/json",
      lang: "vi",
    };
  }
  private get basePath(): string {
    return this.prefix ? `${this.host}/${this.prefix}` : this.host;
  }

  private isClient(): boolean {
    return typeof window !== "undefined";
  }

  private getHeaders(config: CustomFetchConfig): Record<string, string> {
    const headers = { ...this.headers };

    const token = this.isClient() ? "" : config.token;

    if (token) {
      headers.Authorization = token;
    }

    if (config.body && config.method !== "GET") {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  public async Http({
    path,
    config = {},
  }: {
    path: string;
    config?: CustomFetchConfig;
  }): Promise<any> {
    const { method = "GET", body, ...restConfig } = config;
    const headers = this.getHeaders(config);
    const fetchConfig: RequestInit = {
      method,
      headers,
      credentials: "include",
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      cache: "no-cache" as RequestCache,
      ...restConfig,
    };

    try {
      const response = await fetch(this.basePath + path, fetchConfig);
      return response.json();
    } catch (error: any) {
      return {
        status: "error",
        message: error.message || "Something went wrong",
      };
    }
  }
}
