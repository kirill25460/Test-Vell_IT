import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk } from './authActions';
interface AuthState {
  user: string | null;
  accessToken: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}
interface LoginResponse {
  accessToken: string;
}
interface ErrorResponse {
  message: string;
  code?: number;
}
const initialState: AuthState = {
  user: localStorage.getItem("user"),
  accessToken: localStorage.getItem("accessToken"),
  isAuth: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      state.user = null;
      state.accessToken = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        console.log("Токен получен:", action.payload.accessToken);
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
      })
      .addCase(loginThunk.rejected, (state, action: PayloadAction<ErrorResponse>) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
