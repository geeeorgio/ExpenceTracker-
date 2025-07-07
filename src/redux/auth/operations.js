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
      console.log(data);
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
      await api.get("auth/logout");
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const userRefresh = createAsyncThunk(
//   "auth/refresh",
//   async (_, { dispatch, getState, rejectWithValue }) => {
//     try {
//       const sid = getState().auth.tokens.sid;
//       console.log("sid", sid);
//       if (!sid) return rejectWithValue("No sid");

//       const { data } = await api.post("auth/refresh", { sid: sid });
//       console.log("refresh", data);

//       setAuthHeader(data.accessToken);
//       await dispatch(getCurrentUser());

//       return data;
//     } catch (error) {
//       console.log("Full error", error.response);
//       console.error("Refresh failed", error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );
