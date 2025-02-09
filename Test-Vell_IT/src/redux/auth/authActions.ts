import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFoo ,token } from "../../services/API"; 


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


export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
});
