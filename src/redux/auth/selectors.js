import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (authState) => authState.user
);
export const selectIsLoggedIn = createSelector(
  [selectAuthState],
  (authState) => authState.isLoggedIn
);
export const selectAuthLoading = createSelector(
  [selectAuthState],
  (authState) => authState.isLoading
);
export const selectAuthError = createSelector(
  [selectAuthState],
  (authState) => authState.error
);
export const selectAccessToken = createSelector(
  [selectAuthState],
  (authState) => authState.accessToken
);
export const selectRefreshToken = createSelector(
  [selectAuthState],
  (authState) => authState.refreshToken
);
export const selectSid = createSelector(
  [selectAuthState],
  (authState) => authState.sid
);
