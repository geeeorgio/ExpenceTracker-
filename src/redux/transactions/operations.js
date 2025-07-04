import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (type, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/transactions/${type}`);
      console.log("getTrans", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction, { rejectWithValue }) => {
    try {
      console.log("addTransaction", transaction);
      const { data } = await api.post("/transactions", transaction);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/transactions/${transaction.type}`,
        transaction.id
      );
      console.log("deleteTrans", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/transactions/${transaction.type}/${transaction.id}`,
        transaction.id
      );
      console.log("uptTrans", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
