
export interface CustomFetchConfig {
  method?: string;
  body?: any;
  token?: string;
}
export interface AuthCredentials {
  fullname?: string;
  username: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
