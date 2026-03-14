import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoding] = useState(false);
  const [data, setData] = useState({ code: "" });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
    // console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoding(true);
      const resp = await axios.post(
        "https://crudauth-backend.onrender.com/api/user/verify",
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

  const handleResend = async () => {
    navigate("/resend");
    setSeconds(30);
    setCanResend(false);
  };

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [seconds]);
  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify OTP
        </h2>
        <p className="mt-6 text-center text-sm text-black-600 text-xl">
          Check your registered email and verify OTP.
        </p>
        <p className="mt-6 text-center text-sm text-gray-600">
          OTP is valid for 15 minutes.
        </p>
        <form action="" className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your OTP"
            required
            name="code"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            {loading ? "Loding..." : "Verify OTP"}
          </button>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`mt-4 w-full py-2 rounded-md transition-colors ${canResend ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            {canResend ? "Resend OTP" : `Resend OTP in ${seconds}s`}
          </button>
        </form>

        {/* <p className='mt-6 text-center text-sm text-gray-600'>Already have an account?<Link to="/signin" className='text-blue-600 font-semibold hover:underline'>Sign In</Link></p> */}
      </div>
    </div>
  );
};

export default VerifyOtp;
