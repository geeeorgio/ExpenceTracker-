import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearAuthHeader, setAuthHeader } from "../../service/api";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/auth/register", credentials);
      await dispatch(
        login({
          password: credentials.password,
          email: credentials.email,
        })
      );
    } catch (error) {
      let errorMessage = "Registration failed";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const { user, accessToken, refreshToken, sid } = response.data;

      if (!user || !accessToken || !refreshToken || !sid) {
        return rejectWithValue({
          message: "Invalid server response structure after login.",
        });
      }

      setAuthHeader(accessToken);

      return response.data;
    } catch (error) {
      let errorMessage = "Login failed";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.status === 403) {
        errorMessage = "Invalid email or password.";
      } else if (error.response && error.response.status === 400) {
        errorMessage = "Invalid input data.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.refreshToken;
    const sid = state.sid;

    if (!refreshToken || !sid) {
      clearAuthHeader();
      return rejectWithValue({
        message: "No valid session to refresh. Please log in again.",
      });
    }

    try {
      setAuthHeader(refreshToken);

      const response = await api.post("/auth/refresh", { sid });

      const {
        accessToken,
        refreshToken: newRefreshToken,
        sid: newSid,
      } = response.data;

      if (!accessToken || !newRefreshToken || !newSid) {
        return rejectWithValue({
          message: "Invalid server response structure after refresh.",
        });
      }

      setAuthHeader(accessToken);

      return { accessToken, refreshToken: newRefreshToken, sid: newSid };
    } catch (error) {
      console.error("Refresh error:", error.response?.data || error.message);

      let errorMessage = "Session refresh failed";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      clearAuthHeader();
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.get("/auth/logout");
      clearAuthHeader();
      return {};
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      let errorMessage = "Logout failed";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);
