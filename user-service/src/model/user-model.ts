import { Role, User } from "@prisma/client";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserAllResponse {
  page: number;
  limit: number;
  total_page: number;
  users: UserResponse[];
}

export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  remember_me: boolean;
  re_captcha_token: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
  remember_me: boolean;
  re_captcha_token: string;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: Role;
}

export interface UserForgotPasswordRequest {
  email: string;
}

export interface UserResetPasswordRequest {
  password: string;
  confirm_password: string;
}

export const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const toUserAllResponse = (
  page: number,
  limit: number,
  total: number,
  users: User[]
): UserAllResponse => {
  return {
    page: page,
    limit: limit,
    total_page: Math.ceil(total / limit),
    users: users.map(toUserResponse),
  };
};
