import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (type, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`transactions/${type}`);
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch transactions.",
      });
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`transactions/${id}`);
      return { id, total: data.total };
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete transaction.",
      });
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transactionData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/transactions", transactionData);
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to add transaction.",
      });
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, type, transactionData }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/transactions/${type}/${id}`,
        transactionData
      );
      return { id, type, transaction: data.transaction, total: data.total };
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update transaction.",
      });
    }
  }
);
