import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (type, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/transactions/${type}`);
      console.log(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transaktions/add",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/transactions", transaction);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transaktions/delete",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/transactions/${transaction.type}`,
        transaction.id
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transaktions/update",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/transactions/${transaction.type}/${transaction.id}`,
        transaction.id
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
