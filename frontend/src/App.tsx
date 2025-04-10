import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import Sellers from "./pages/sellers/Sellers";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import EditUser from "./pages/OwnerDashboard/EditUser";
import SellerCreate from "./pages/sellers/SellerCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <PrivateRoute>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="(/sellers/create" element={<SellerCreate />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
