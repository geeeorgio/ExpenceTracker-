import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, register, refreshUser, userLogout } from "./operations";

const initialState = {
  user: { name: null, email: null },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })

      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          refreshUser.pending,
          userLogout.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          refreshUser.rejected,
          userLogout.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          if (
            action.type === login.rejected.type ||
            action.type === refreshUser.rejected.type
          ) {
            return { ...initialState };
          }
        }
      )

      .addMatcher(
        isAnyOf(
          register.fulfilled,
          login.fulfilled,
          refreshUser.fulfilled,
          userLogout.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const { resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;
