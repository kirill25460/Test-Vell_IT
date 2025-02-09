import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginFoo ,token, getCurrentUser} from "../../services/API"; 


export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { name: string; username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginFoo(credentials);
      token.set(data.accessToken);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || "Ошибка входа",
          code: error.response?.status,
        });
      }
      return rejectWithValue({ message: "Неизвестная ошибка", code: 500 });
    }
  }
);
export const getUserThunk = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Ошибка получения данных пользователя"
        );
      }
      return rejectWithValue("Неизвестная ошибка при получении данных пользователя");
    }
  }
);


export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});
