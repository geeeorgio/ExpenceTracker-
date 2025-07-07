import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./operations";
import { getCurrentUser } from "../user/operations";
import { userLogout } from "../auth/operations";

const initialState = {
  incomes: [],
  expenses: [],
  isLoading: false,
  error: null,
  incomesTotal: 0,
  expensesTotal: 0,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(getTransactions.fulfilled, (state, { payload, meta }) => {
        if (Array.isArray(payload)) {
          if (meta.arg === "incomes") {
            state.incomes = payload;
          } else if (meta.arg === "expenses") {
            state.expenses = payload;
          }
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.incomes = state.incomes.filter(
          (transaction) => transaction._id !== payload.id
        );
        state.expenses = state.expenses.filter(
          (transaction) => transaction._id !== payload.id
        );
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        const { transaction, total } = payload;
        if (transaction.type === "incomes") {
          state.incomes.push(transaction);
          state.incomesTotal = total;
        } else if (transaction.type === "expenses") {
          state.expenses.push(transaction);
          state.expensesTotal = total;
        }
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        const {
          id,
          type,
          transaction: updatedTransaction,
          total: newTotal,
        } = payload;

        if (type === "incomes") {
          const index = state.incomes.findIndex((tra) => tra._id === id);
          if (index !== -1) {
            state.incomes[index] = updatedTransaction;
          }
          state.incomesTotal = newTotal;
        } else if (type === "expenses") {
          const index = state.expenses.findIndex((tra) => tra._id === id);
          if (index !== -1) {
            state.expenses[index] = updatedTransaction;
          }
          state.expensesTotal = newTotal;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.incomesTotal = payload.transactionsTotal.incomes;
        state.expensesTotal = payload.transactionsTotal.expenses;
      })
      .addCase(userLogout.fulfilled, () => {
        return { ...initialState };
      })

      .addMatcher(
        isAnyOf(
          getTransactions.pending,
          addTransaction.pending,
          deleteTransaction.pending,
          updateTransaction.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          getTransactions.rejected,
          addTransaction.rejected,
          deleteTransaction.rejected,
          updateTransaction.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        isAnyOf(
          getTransactions.fulfilled,
          addTransaction.fulfilled,
          deleteTransaction.fulfilled,
          updateTransaction.fulfilled,
          userLogout.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      ),
});

export const transactionsReducer = transactionsSlice.reducer;
