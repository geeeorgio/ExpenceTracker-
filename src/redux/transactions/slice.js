import { createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./operations";

const initialState = {
  incomes: [],
  expenses: [],
  incomesTotal: null,
  expensesTotal: null,
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getTransactions.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;
        state.isError = false;

        if (meta.arg === "incomes") {
          state.incomes = payload;
          state.incomesTotal = payload.reduce(
            (acc, transaction) => acc + transaction.sum,
            0
          );
        } else {
          state.expenses = payload;
          state.expensesTotal = payload.reduce(
            (acc, transaction) => acc + transaction.sum,
            0
          );
        }
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        console.log(payload);
        const { transaction, total } = payload;

        state.isLoading = false;
        state.isError = false;

        if (transaction.type === "incomes") {
          state.incomes.push(transaction);
          state.incomesTotal = total;
        } else {
          state.expenses.push(transaction);
          state.expensesTotal = total;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload, meta }) => {
        const { _id, type } = meta.arg;

        if (type === "incomes") {
          state.incomes = state.incomes.filter(
            (transaction) => transaction._id !== _id
          );
          state.incomesTotal = payload.total;
        } else {
          state.expenses = state.expenses.filter(
            (transaction) => transaction._id !== _id
          );
          state.expensesTotal = payload.total;
        }
      })
      .addCase(updateTransaction.fulfilled, (state, { payload, meta }) => {
        const { _id, type } = meta.arg;

        if (type === "incomes") {
          state.incomes = state.incomes.map((transaction) =>
            transaction._id === _id
              ? { ...transaction, ...payload.transaction }
              : transaction
          );
          state.incomesTotal = payload.total;
        } else {
          state.expenses = state.expenses.map((transaction) =>
            transaction._id === _id
              ? { ...transaction, ...payload.transaction }
              : transaction
          );
          state.expensesTotal = payload.total;
        }
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      ),
});

export const transactionsReducer = slice.reducer;
