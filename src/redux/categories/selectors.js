import { createSelector } from "@reduxjs/toolkit";

const selectCategoriesState = (state) => state.categories;

export const selectIncomes = createSelector(
  [selectCategoriesState],
  (categories) => categories.incomes
);

export const selectExpenses = createSelector(
  [selectCategoriesState],
  (categories) => categories.expenses
);

export const selectCategoriesByType = (type) =>
  createSelector(
    [selectCategoriesState],
    (categories) => categories.categories[type] ?? []
  );

export const selectCategoryById = (_id) =>
  createSelector([selectIncomes, selectExpenses], (incomes, expenses) => {
    return (
      incomes.find((cat) => cat._id === _id) ||
      expenses.find((cat) => cat._id === _id) ||
      null
    );
  });
