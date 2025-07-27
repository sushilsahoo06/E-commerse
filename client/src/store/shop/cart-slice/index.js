import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartList: [],
};
export const addNewCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      { userId, productId, quantity },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  "/cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );
    return response?.data;
  }
);
export const updateCartItems = createAsyncThunk(
  "/cart/updateCartItems",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      { userId, productId, quantity },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);
export const deleteCartItems = createAsyncThunk(
  "/cart/deleteCartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );
    return response?.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload || null;
        console.log(action.payload);
      })
      .addCase(fetchCartItems.rejected, (state) => {
        (state.isLoading = true), (state.cartList = []);
      })
      .addCase(addNewCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload || null;
        console.log(action.payload);
      })
      .addCase(addNewCart.rejected, (state) => {
        (state.isLoading = true), (state.cartList = []);
      })
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload || null;
        console.log(action.payload);
      })
      .addCase(updateCartItems.rejected, (state) => {
        (state.isLoading = true), (state.cartList = []);
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartList = action.payload || null;
        console.log(action.payload);
      })
      .addCase(deleteCartItems.rejected, (state) => {
        (state.isLoading = true), (state.cartList = []);
      });
  },
});

export default shoppingCartSlice.reducer