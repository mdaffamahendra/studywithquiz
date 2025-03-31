import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../fetch";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await login("auth/signin", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk untuk refresh token
export const refreshAuthToken = createAsyncThunk(
  "users/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL_REFRESH, {}, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to refresh token");
    }
  }
);

const AuthSlice = createSlice({
  name: "users",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    status: "",
    error: "",
  },
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message || "Email atau password anda salah";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.accessToken)
        );
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.accessToken)
        );
      });
  },
});

export const { userLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
