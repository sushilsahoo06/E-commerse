import { Route, Routes } from "react-router-dom";
import Layout from "./components/authentication/Layout";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/register";
import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Features from "./pages/admin/Features";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<Dashboard/>}></Route>
          <Route path="products" element={<Products/>}></Route>
          <Route path="orders" element={<Orders/>}></Route>
          <Route path="features" element={<Features/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
