import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, getUserThunk  } from './authActions';
interface AuthState {
  user:  User | null;
  accessToken: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}
interface LoginResponse {
  accessToken: string;
}
interface User {
  username: string;
  id: string;
}
const initialState: AuthState = {
  user: null,
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
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
