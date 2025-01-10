/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_API_ENDPOINT } from "@/constant/endPoints";
import { apiBaseServiceInstance } from "../api";

class AuthWebtoonApiRequest {
  public Login({
    body,
  }: {
    body: { username: string; password: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN,
      config: {
        method: "POST",
        body,
      },
    });
  }

  public Register({
    body,
  }: {
    body: { username: string; password: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.REGISTER,
      config: {
        method: "POST",
        body,
      },
    });
  }
  public Logout(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGOUT,
      config: {
        method: "POST",
      },
    });
  }

  public VerifyUser(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.VERITY,
      config: {
        method: "GET",
      },
    });
  }
  public ChangePassword({
    body,
  }: {
    body: { oldPassword: string; newPassword: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.CHANGE_PASSWORD,
      config: {
        method: "POST",
        body,
      },
    });
  }
}

const AuthWebtoonApi = new AuthWebtoonApiRequest();

export default AuthWebtoonApi;
