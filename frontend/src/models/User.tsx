export interface Profile {
  id: string;
  email: string;
  role: boolean;
  status?: number;
  created?: string;
  token?: string;
  isLogin: boolean;
}

export interface UserRegisterForm {
  email: string;
  password: string;
  role: string;
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: boolean;
  status: number;
  created: string;
  modified: string;
}

export interface UserCreateForm {
  id: string;
  email: string;
  role: boolean;
  status: number;
  created: string;
  modified: string;
}
