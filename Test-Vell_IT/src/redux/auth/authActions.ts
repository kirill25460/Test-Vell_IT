import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFoo ,token, getCurrentUser} from "../../services/API"; 



export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { name: string; username: string; password: string }, { rejectWithValue }) => {
    try {
      const data  = await loginFoo(credentials);
      token.set(data.accessToken);
      return data;
    } catch (error:any) {
      return rejectWithValue({
        message: error.message || 'An error occurred',
        code: error.code,
      });
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
      return rejectWithValue(error.response?.data?.message || "Ошибка получения данных пользователя");
    }
  }
);


export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});
