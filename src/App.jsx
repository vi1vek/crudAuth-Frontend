import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import VerifyOtp from "./pages/User/VerifyOtp";
import ResendOtp from "./pages/User/ResendOtp";
import Dashboard from "./pages/Dashboard";
import PostCreate from "./pages/Post/PostCreate";
import PostDashboard from "./pages/Post/PostDashboard";
import { ProtectedRoute } from "./pages/protect/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGetAllProduct from "./pages/admin/AdminGetAllProduct";
import ResetCode from "./pages/User/ResetCode";
import ResetPassword from "./pages/User/ResetPassword";
import Card from "./pages/Post/Card";
import HomeDashboard from "./pages/HomeDashboard";
import EditPost from "./pages/Post/EditPost";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomeDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<PostCreate />} />
              <Route path="/products/getall" element={<PostDashboard />} />
              <Route path="/admin/getalluser" element={<AdminDashboard />} />
              <Route path="/update/:id" element={<EditPost />} />

              <Route
                path="/admin/getallproducts"
                element={<AdminGetAllProduct />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/resend" element={<ResendOtp />} />
            <Route path="/reset" element={<ResetCode />} />
            <Route path="/reset/password" element={<ResetPassword />} />
            <Route path="/card" element={<Card />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
