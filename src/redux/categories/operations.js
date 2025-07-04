import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getCategories = createAsyncThunk(
  "categories/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      console.log("getCategories", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCategories = createAsyncThunk(
  "categories/add",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/categories", category);
      console.log("addCategories", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (_id, { rejectWithValue }) => {
    try {
      console.log("deleteTransaction", _id);
      const { data } = await api.delete(`/categories/${_id}`);
      console.log("deleteTransaction", data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategories = createAsyncThunk(
  "categories/update",
  async (category, { rejectWithValue }) => {
    try {
      console.log("upt ops cat", category);
      const { data } = await api.patch(`/categories/${category._id}`, {
        categoryName: category.categoryName,
      });
      console.log("updateCategories", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
