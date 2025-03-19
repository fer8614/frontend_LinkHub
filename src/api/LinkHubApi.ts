import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileFormProps, User } from "../types";

export async function getUser() {
  try {
    const { data } = await api<User>(`/user`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProfile(formData: ProfileFormProps) {
  try {
    const { data } = await api.patch<string>(`/user`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
