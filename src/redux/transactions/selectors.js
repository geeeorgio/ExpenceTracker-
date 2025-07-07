import { createSelector } from "@reduxjs/toolkit";

export const selectAllIncomes = (state) => state.transactions.incomes;
export const selectAllExpenses = (state) => state.transactions.expenses;
export const selectTotalIncome = (state) => state.transactions.incomesTotal;
export const selectTotalExpense = (state) => state.transactions.expensesTotal;

export const selectTransactionsByType = (type) =>
  createSelector([selectAllIncomes, selectAllExpenses], (incomes, expenses) =>
    type === "incomes" ? incomes : expenses
  );
