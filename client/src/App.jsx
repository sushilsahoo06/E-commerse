import { Route, Routes } from "react-router-dom";

import Layout from "./components/authentication/Layout";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/register";

import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Features from "./pages/admin/Features";
import NotFound from "./pages/not-found/NotFound";

import Shopping_layout from "./components/shopping-view/Shopping_layout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import Unuth from "./pages/unauth/Unuth";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

function App() {
  // const isAuthenticated = false;
  // const user = {};
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading){
    <div>Loading...</div>
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="features" element={<Features />}></Route>
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shopping_layout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />}></Route>
          <Route path="checkout" element={<ShoppingCheckout />}></Route>
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="listing" element={<ShoppingListing />}></Route>
        </Route>
        <Route path="/Unauth-page" element={<Unuth />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
