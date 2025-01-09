import { APP_API_ENDPOINT } from "@/constant/endPoints";
import { ApiClient } from "./http";

const createApiClientInstance = (host: string, prefix: string): ApiClient => {
  return new ApiClient(host, prefix);
};

const apiBaseServiceInstance = createApiClientInstance(
  "http://localhost:5000" as string,
  "api" as string
);

export { apiBaseServiceInstance };
