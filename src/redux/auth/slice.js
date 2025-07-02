import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { userLogin, userLogout, userRefresh, userRegister } from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
    avatarUrl: "",
    currency: "",
  },
  tokens: {
    accessToken: "",
    refreshToken: "",
    sid: "",
  },
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user.email = payload.user.email;
        state.user.name = payload.user.name;
        state.user.avatarUrl = payload.user.avatarUrl;
        state.user.currency = payload.user.currency;
        state.tokens.accessToken = payload.accessToken;
        state.tokens.refreshToken = payload.refreshToken;
        state.tokens.sid = payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(userRefresh.pending, (state) => {
        state.isError = false;
        state.isRefreshing = true;
      })
      .addCase(userRefresh.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isRefreshing = false;
        state.tokens = payload;
      })
      .addCase(userRefresh.rejected, (state) => {
        state.isError = true;
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })

      .addMatcher(
        isAnyOf(userLogin.pending, userRegister.pending, userLogout.pending),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        isAnyOf(userLogin.rejected, userRegister.rejected, userLogout.rejected),
        (state) => {
          state.isLoading = false;
          state.isError = true;
          state.isLoggedIn = false;
        }
      ),
});

export const authReducer = slice.reducer;
