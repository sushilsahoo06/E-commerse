import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  ProductList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/shop/fetchAllFilteredProducts",
  async ({filterParams,sortParams}) => {
    const quary=new URLSearchParams(
      {
        ...filterParams,
        sort:sortParams
      }
    )
    const response = await axios.get(
      `http://localhost:5000/api/shop/products/get?${quary}`
    );
    return response.data;
  }
);

const shoppingProductslice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.ProductList=action.payload.data;
      //console.log(action.payload.data)
    })
    .addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
      state.isLoading=false;
      state.ProductList=[];
      
    })
  }
});

export default shoppingProductslice.reducer;