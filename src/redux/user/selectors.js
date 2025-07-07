export const selectUser = (state) => state.user.user;
export const selectUserAvatar = (state) => state.user.user?.avatarUrl;
export const selectUserName = (state) => state.user.user?.name;
export const selectUserCurrency = (state) => state.user.user?.currency;
export const selectUserIsLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
