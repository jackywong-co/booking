export interface Profile {
  id: string;
  email: string;
  is_staff: boolean;
  status?: number;
  created?: string;
  token?: string;
  isLogin: boolean;
}

export interface UserCreateForm {
  email: string;
  password: string;
  is_staff: boolean;
}

export interface UserLoginForm {
  email: string;
  password: string;
  captcha_token: string;
  totp_code: string;
}

export interface User {
  id: string;
  email: string;
  is_staff: boolean;
  totp: string;
  status: number;
  created: string;
  modified: string;
}
