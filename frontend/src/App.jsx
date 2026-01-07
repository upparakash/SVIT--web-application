import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import Account from "./pages/Customer/Account";
import Login from "./pages/Customer/Login";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPassword from "./pages/Customer/ForgotPassword";
import ResetPassword from "./pages/Customer/ResetPassword";
import Registration from "./pages/Customer/Registration";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
    <Route path="/checkout" element={<Checkout />} />
<Route path="/orders" element={<OrdersPage />} />


          {/* 🔐 PROTECTED ROUTE */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
