import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ResetCode = () => {
  const { setEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState({ email: "" });

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
    if (!data.email) {
      return alert("Email is required.");
    }
    try {
      setLoding(true);
      const resp = await axios.post(
        "http://localhost:5000/api/user/resetcode",
        data,
      );
      //   console.log(data.email);
      setEmail(data.email);
      alert(resp.data.message);
      navigate("/reset/password");
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      // alert("Signup failed!")
      setLoding(false);
    }

    navigate("/reset/password");
  };

  return (
    <div className="min-h-screen bg-green-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Your Password
        </h2>
        <p className="mt-6 text-center text-black-600 text-1rem">
          Enter your registered email.
        </p>
        <form action="" className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            name="email"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md cursor-pointer"
          >
            {loading ? "Loding..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetCode;
