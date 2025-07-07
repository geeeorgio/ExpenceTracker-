import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  updateUser,
  userAvatarChange,
  deleteUserAvatar,
} from "./operations";
import { userLogout } from "../auth/operations";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (state.user) {
          state.user = { ...state.user, ...payload };
        } else {
          state.user = payload;
        }
      })
      .addCase(userAvatarChange.fulfilled, (state, { payload }) => {
        if (state.user) {
          state.user.avatarUrl = payload.avatarUrl;
        }
      })
      .addCase(deleteUserAvatar.fulfilled, (state) => {
        if (state.user) {
          state.user.avatarUrl = null;
        }
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })

      .addMatcher(
        isAnyOf(
          getCurrentUser.pending,
          updateUser.pending,
          userAvatarChange.pending,
          deleteUserAvatar.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          getCurrentUser.rejected,
          updateUser.rejected,
          userAvatarChange.rejected,
          deleteUserAvatar.rejected,
          userLogout.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          if (action.type === getCurrentUser.rejected.type) {
            return { ...initialState };
          }
        }
      )

      .addMatcher(
        isAnyOf(
          getCurrentUser.fulfilled,
          updateUser.fulfilled,
          userAvatarChange.fulfilled,
          deleteUserAvatar.fulfilled,
          userLogout.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const userReducer = slice.reducer;
