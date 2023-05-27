export interface Profile {
  id: number;
  email: string;
  role: number;
  status?: number;
  created?: string;
  token?: string;
  isLogin: boolean;
}

export interface UserRegisterForm {
  email: string;
  password: string;
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  role: number;
  status: number;
  created: string;
  modified: string;
}

export interface UserCreateForm {
  id: number;
  email: string;
  role: number;
  status: number;
  created: string;
  modified: string;
}
