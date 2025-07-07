import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addCategories,
  deleteCategory,
  getCategories,
  updateCategories,
} from "./operations";
import { getCurrentUser } from "../user/operations";
import { userLogout } from "../auth/operations";

const initialState = {
  categories: {
    incomes: [],
    expenses: [],
  },
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories.incomes = payload.incomes;
        state.categories.expenses = payload.expenses;
      })
      .addCase(addCategories.fulfilled, (state, { payload }) => {
        if (payload.type === "incomes") {
          state.categories.incomes.push(payload);
        } else if (payload.type === "expenses") {
          state.categories.expenses.push(payload);
        }
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        const { _id } = payload;

        state.categories.incomes = state.categories.incomes.filter(
          (cat) => cat._id !== _id
        );
        state.categories.expenses = state.categories.expenses.filter(
          (cat) => cat._id !== _id
        );
      })
      .addCase(updateCategories.fulfilled, (state, { payload }) => {
        const { _id, categoryName } = payload;

        const incomeIndex = state.categories.incomes.findIndex(
          (cat) => cat._id === _id
        );
        if (incomeIndex !== -1) {
          state.categories.incomes[incomeIndex].categoryName = categoryName;
        }

        const expenseIndex = state.categories.expenses.findIndex(
          (cat) => cat._id === _id
        );
        if (expenseIndex !== -1) {
          state.categories.expenses[expenseIndex].categoryName = categoryName;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        if (payload.categories) {
          state.categories.incomes = payload.categories.incomes || [];
          state.categories.expenses = payload.categories.expenses || [];
        } else {
          state.categories = { incomes: [], expenses: [] };
        }
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })

      .addMatcher(
        isAnyOf(
          getCategories.pending,
          addCategories.pending,
          deleteCategory.pending,
          updateCategories.pending,
          getCurrentUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          getCategories.rejected,
          addCategories.rejected,
          deleteCategory.rejected,
          updateCategories.rejected,
          getCurrentUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        isAnyOf(
          getCategories.fulfilled,
          addCategories.fulfilled,
          deleteCategory.fulfilled,
          updateCategories.fulfilled,
          getCurrentUser.fulfilled,
          userLogout.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      ),
});

export const categoriesReducer = slice.reducer;
