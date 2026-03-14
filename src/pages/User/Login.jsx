import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const { setIslogout } = useContext(AuthContext);
  const [loading, setLoding] = useState(false);
  const [showPassword, setShow] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
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

    if (!data.email || !data.password) {
      return alert("All Fields are required");
    }
    try {
      setLoding(true);
      const resp = await axios.post(
        "https://crudauth-backend.onrender.com/api/user/signin",
        data,
        { withCredentials: true },
      );
      setLoding(false);
      // console.log(resp);
      alert(resp.data.message);
      setIslogout(true);

      navigate("/products/getall");
    } catch (error) {
      if (error.response) {
        return alert(error.response.data.message);
      }
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <form action="" className="space-y-2">
          <label htmlFor="email">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="enter your email"
            id="email"
            required
            name="email"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />

          <label htmlFor="password">
            Password<span className="text-red-600">*</span>
          </label>
          <div className=" block w-full bg-gray-50 border border-gray-300 rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="enter your password "
              required
              name="password"
              onChange={handleChange}
              className="mt-1 w-75 px-4 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
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
            {loading ? "Loding..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="text-green-800 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
