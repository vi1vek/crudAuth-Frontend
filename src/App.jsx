import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/User/Signup";
import Login from "./pages/User/Login";
import VerifyOtp from "./pages/User/VerifyOtp";
import ResendOtp from "./pages/User/ResendOtp";
import Dashboard from "./pages/Dashboard";
import PostCreate from "./pages/Post/PostCreate";
import PostDashboard from "./pages/Post/PostDashboard";
import { ProtectedRoute } from "./pages/protect/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<PostCreate />} />
              <Route path="/products/getall" element={<PostDashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/resend" element={<ResendOtp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
