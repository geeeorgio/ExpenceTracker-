import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearAuthHeader, setAuthHeader } from "../../service/api";

export const userRegister = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      await api.post("auth/register", userData);
      await dispatch(
        userLogin({ email: userData.email, password: userData.password })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("auth/login", userData);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("auth/logout");
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.tokens.refreshToken;
      if (!token) return rejectWithValue("No token");
      setAuthHeader(token);
      const sid = getState().auth.tokens.sid;
      const { data } = await api.post("auth/refresh", { sid });
      console.log(data);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
