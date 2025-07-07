import { createSelector } from "@reduxjs/toolkit";

const selectUserState = (state) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);
export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name ?? null
);
export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user?.email ?? null
);
export const selectUserAvatar = createSelector(
  [selectUser],
  (user) => user?.avatarUrl ?? null
);
export const selectUserCurrency = createSelector(
  [selectUser],
  (user) => user?.currency ?? null
);
export const selectUserCategories = createSelector(
  [selectUser],
  (user) => user?.categories ?? { incomes: [], expenses: [] }
);
export const selectUserIncomesCategories = createSelector(
  [selectUserCategories],
  (categories) => categories.incomes ?? []
);
export const selectUserExpensesCategories = createSelector(
  [selectUserCategories],
  (categories) => categories.expenses ?? []
);
export const selectUserTransactionsTotal = createSelector(
  [selectUser],
  (user) => user?.transactionsTotal ?? { incomes: 0, expenses: 0 }
);
export const selectUserIncomesTotal = createSelector(
  [selectUserTransactionsTotal],
  (transactionsTotal) => transactionsTotal.incomes ?? 0
);
export const selectUserExpensesTotal = createSelector(
  [selectUserTransactionsTotal],
  (transactionsTotal) => transactionsTotal.expenses ?? 0
);
export const selectIsLoggedIn = createSelector(
  [selectUser],
  (user) => user !== null
);
