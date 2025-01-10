import { APP_API_ENDPOINT } from "@/constant/endPoints";
import { ApiClient } from "./http";

const createApiClientInstance = (host: string, prefix: string): ApiClient => {
  return new ApiClient(host, prefix);
};

// const apiBaseServiceInstance = createApiClientInstance(
//   APP_API_ENDPOINT.ENDPOINT.NEXT_PUBLIC_BASE_URL as string,
//   APP_API_ENDPOINT.ENDPOINT.NEXT_PUBLIC_PREFIX_URL as string
// );

const apiBaseServiceInstance = createApiClientInstance(
  "http://localhost:5000" as string,
  "api" as string
);
export { apiBaseServiceInstance };
