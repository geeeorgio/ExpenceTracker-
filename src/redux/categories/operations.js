import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getCategories = createAsyncThunk(
  "categories/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories.",
      });
    }
  }
);

export const addCategories = createAsyncThunk(
  "categories/add",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/categories", category);
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to add category.",
      });
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (_id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${_id}`);
      return { _id };
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete category.",
      });
    }
  }
);

export const updateCategories = createAsyncThunk(
  "categories/update",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/categories/${category._id}`, {
        categoryName: category.categoryName,
      });

      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update category.",
      });
    }
  }
);
