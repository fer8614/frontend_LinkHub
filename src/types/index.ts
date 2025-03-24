import { ReactNode } from "react";

export type ErrorMessageProps = {
  children: ReactNode;
};

export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
};

export type RegisterFormProps = Pick<User, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};

export type LoginFormProps = Pick<User, "email"> & {
  password: string;
};

export type ProfileFormProps = Pick<User, "handle" | "description">;
