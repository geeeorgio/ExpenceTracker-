import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../service/api";
import { userLogout } from "../auth/operations";

export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      if (!token) {
        return rejectWithValue({ message: "No authentication token found." });
      }

      setAuthHeader(token);
      const { data } = await api.get("users/current");
      return data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(userLogout());
        return rejectWithValue({
          message: "Session expired. Please log in again.",
        });
      }

      let errorMessage = "Failed to get current user.";
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

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("users/info", userData);
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update user.",
      });
    }
  }
);

export const userAvatarChange = createAsyncThunk(
  "user/avatarChange",
  async (avatarFile, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("users/avatar", avatarFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to change avatar.",
      });
    }
  }
);

export const deleteUserAvatar = createAsyncThunk(
  "user/avatarDelete",
  async (_, { getState, rejectWithValue }) => {
    try {
      const avatarUrl = getState().user.user?.avatarUrl;
      if (!avatarUrl) {
        return rejectWithValue({ message: "No avatar to delete." });
      }

      await api.delete("users/avatar");

      return {};
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete avatar.",
      });
    }
  }
);
