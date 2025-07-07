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
  isError: false,
  isLoading: false,
};

const slice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.categories.incomes = payload.incomes;
        state.categories.expenses = payload.expenses;
      })
      .addCase(addCategories.fulfilled, (state, { payload }) => {
        const type = payload.type;
        if (type === "incomes") {
          state.categories.incomes.push(payload);
        } else {
          state.categories.expenses.push(payload);
        }
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(deleteCategory.fulfilled, (state, { meta }) => {
        const _id = meta.arg;

        state.categories.incomes = state.categories.incomes.filter(
          (cat) => cat._id !== _id
        );

        state.categories.expenses = state.categories.expenses.filter(
          (cat) => cat._id !== _id
        );

        state.isError = false;
        state.isLoading = false;
      })
      .addCase(updateCategories.fulfilled, (state, { payload }) => {
        const updateIn = state.categories.incomes.find(
          (cat) => cat._id === payload._id
        );
        if (updateIn) {
          updateIn.categoryName = payload.categoryName;
        }

        const updateEx = state.categories.expenses.find(
          (cat) => cat._id === payload._id
        );
        if (updateEx) {
          updateEx.categoryName = payload.categoryName;
        }
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.categories.incomes = payload.categories.incomes;
        state.categories.expenses = payload.categories.expenses;
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
          state.isError = false;
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
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

export const categoriesReducer = slice.reducer;
