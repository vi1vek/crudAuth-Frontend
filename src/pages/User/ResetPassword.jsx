import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ResetPassword = () => {
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShow] = useState(false);
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState({ email: email });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
    // console.log(data);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);

      if (
        !data.email ||
        !data.otp ||
        !data.newPassword ||
        !data.confirm_password
      ) {
        return alert("All field are required.");
      }
      if (data.newPassword !== data.confirm_password) {
        return alert("New password and Confirm Password not match");
      }
      const resp = await axios.post(
        "http://localhost:5000/api/user/resetpassword",
        data,
      );
      alert(resp.data.message);
      navigate("/login");
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      // alert("Signup failed!")
      setLoding(false);
    }
  };
  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          Verify OTP And Create New Password
        </h2>
        {/* <p className="mt-6 text-center text-sm text-black-600 text-xl">
          Check your registered email and verify OTP.
        </p> */}
        <p className="mt-6 text-center text-sm text-gray-600">
          OTP is valid for 15 minutes.
        </p>
        <form action="" className="space-y-4">
          <div className="mb-3">
            <label htmlFor="email">
              Registered Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="otp">
              OTP<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword">
              New Password<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              className="mt-1  w-75 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              id="confirm_password"
              name="confirm_password"
              placeholder="Enter confirm password"
              required
            />
            <button type="submit" onClick={handleClick} className="px-4 py-3">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            {loading ? "Loding..." : "Verify OTP"}
          </button>
        </form>

        {/* <p className='mt-6 text-center text-sm text-gray-600'>Already have an account?<Link to="/signin" className='text-blue-600 font-semibold hover:underline'>Sign In</Link></p> */}
      </div>
    </div>
  );
};

export default ResetPassword;
