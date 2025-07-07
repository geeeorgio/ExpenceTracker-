import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { userLogin, userLogout, userRegister } from "./operations";
import {
  deleteUserAvatar,
  getCurrentUser,
  updateUser,
  userAvatarChange,
} from "../user/operations";

const initialState = {
  user: {
    name: "",
    email: "",
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
        state.tokens.accessToken = payload.accessToken;
        state.tokens.refreshToken = payload.refreshToken;
        state.tokens.sid = payload.sid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isRefreshing = false;
        state.user.email = payload.email;
        state.user.name = payload.name;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.tokens = { accessToken: "", refreshToken: "", sid: "" };
      })
      // .addCase(userRefresh.pending, (state) => {
      //   state.isError = false;
      //   state.isRefreshing = true;
      // })
      // .addCase(userRefresh.fulfilled, (state, { payload }) => {
      //   state.isError = false;
      //   state.isRefreshing = false;
      //   state.tokens = payload;
      //   state.isLoggedIn = true;
      // })
      // .addCase(userRefresh.rejected, (state) => {
      //   state.isError = true;
      //   state.isRefreshing = false;
      //   state.isLoggedIn = false;
      //   state.tokens = { accessToken: "", refreshToken: "", sid: "" };
      // })

      .addMatcher(
        isAnyOf(
          userLogin.pending,
          userRegister.pending,
          getCurrentUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isRefreshing = true;
        }
      )

      .addMatcher(
        isAnyOf(
          userLogin.fulfilled,
          userRegister.fulfilled,
          userLogin.rejected,
          userRegister.rejected,
          userLogout.fulfilled,
          userLogout.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isRefreshing = false;
        }
      )

      .addMatcher(
        isAnyOf(
          updateUser.pending,
          userAvatarChange.pending,
          deleteUserAvatar.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          updateUser.fulfilled,
          userAvatarChange.fulfilled,
          deleteUserAvatar.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          updateUser.rejected,
          userAvatarChange.rejected,
          deleteUserAvatar.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

export const authReducer = slice.reducer;
