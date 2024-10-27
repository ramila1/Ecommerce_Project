import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Category from "./pages/user/Category";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgetPassword"; // Fixed typo
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import SingleUser from "./pages/Admin/SingleUser";
import AllProducts from "./pages/user/AllProducts";
import CategoryProduct from "./pages/user/CategoryProduct";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/user/Payment";
import SingleProduct from "./pages/user/SingleProduct";
import AllOrder from "./pages/Admin/AllOrder";
import ProductDetails from "./pages/Admin/ProductDetails";

// Load the Stripe public key (ensure you use the public key)
const stripePromise = loadStripe(process.env.STRIPE_API_KEY);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin/create-category" element={<CreateCategory />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/:id" element={<UpdateProduct />} />
        <Route path="/admin/single-user/:id" element={<SingleUser />} />
        <Route path="/admin/all-order" element={<AllOrder />}></Route>
        <Route
          path="/admin/product-details/:id"
          element={<ProductDetails />}
        ></Route>

        <Route path="/user/all-category" element={<Category />}></Route>
        <Route
          path="/user/all-category/category/get-category-products/:id"
          element={<CategoryProduct />}
        ></Route>
        <Route
          path="/user/single-product/:id"
          element={<SingleProduct />}
        ></Route>
        <Route path="/user/all-product" element={<AllProducts />} />
        <Route
          path="/user/payment/:id"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
