import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
import adminProductSlice from './admin/product-slice/index'
import shopFilterProducts from './shop/product-slice/index'
import shoppingCartSlice from './shop/cart-slice/index'

const store=configureStore({
  reducer:{
    auth:authReducer,
    adminProduct:adminProductSlice,
    shopProduct:shopFilterProducts,
    cartItem:shoppingCartSlice
  }
  
})


export default store;