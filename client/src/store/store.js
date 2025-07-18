import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
import adminProductSlice from './admin/product-slice/index'
import shopFilterProducts from './shop/product-slice/index'

const store=configureStore({
  reducer:{
    auth:authReducer,
    adminProduct:adminProductSlice,
    shopProduct:shopFilterProducts
  }
  
})


export default store;