import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productList: [],
};
//add new data
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        withCredentials: true,
        headers: {
          "content-type": "applications/json",
        },
      }
    );
    return response?.data
  }
);
//fetch all data
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formData) => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/products/get",
    );
    return response?.data
  }
);


export const editProduct= createAsyncThunk(
  "/products/editProduct",
  async (id) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
    );
    return response?.data
  }
);


export const deleteProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`,
    );
    return response?.data
  }
);


const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase();
  },
});
