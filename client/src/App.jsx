import { Route, Routes } from "react-router-dom";
import Layout from "./components/authentication/Layout";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/register";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<Layout />}>
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
