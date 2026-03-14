import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [showPassword, setShow] = useState(false);
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();
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
    // console.log("submit");
    if (!data.name || !data.email || !data.password || !data.confirm_password) {
      return alert("All Fields are required");
    }

    if (data.password !== data.confirm_password) {
      return alert("Password And Confirm Password Are Not Match.");
    }

    try {
      setLoding(true);
      const resp = await axios.post(
        "https://crudauth-backend.onrender.com/api/user/signup",
        data,
      );

      alert(resp.data.message);
      navigate("/verify");
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      // alert("Signup failed!")
      setLoding(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-green-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create Account
          </h2>
          <form className="space-y-4">
            <div className="mb-3">
              <label htmlFor="name">
                Username<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                Password<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                id="password"
                name="password"
                placeholder="Create a password"
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
                placeholder="Confirm your password"
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
              {loading ? "Loding..." : "Signup"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-green-800 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
