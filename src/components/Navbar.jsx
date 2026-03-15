import axios from "axios";
import { useContext } from "react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
  const { isLogout, setIslogout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        { withCredentials: true },
      );
      setIslogout(false);
      alert(resp.data.message);
    } catch (err) {
      alert(err.data.message);
    }
  };
  return (
    <div className=" bg-green-400 w-full p-4 border-b-2 border-green-800">
      <header className="flex items-center justify-between max-w-7xl">
        <h2 className="flex text-2xl font-bold text-gray-800">CRUD and Auth</h2>
        <ul className="flex items-center space-x-8 text-gray-700 ">
          <li className="cursor-pointer text-xl ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white  font-bold p-2 rounded-xl border-b-2 border-green-300 hover:text-black"
                  : "text-gray-700 hover:text-white hover:font-bold hover:p-2 hover:rounded-xl hover:border-b-2 hover:border-green-300 "
              }
            >
              Home
            </NavLink>
          </li>
          <li className="cursor-pointer text-xl hover:text-black">Favourite</li>
          <li className="cursor-pointer text-xl hover:text-black">Cart</li>
          {isLogout ? (
            <li className="cursor-pointer hover:text-black">
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="cursor-pointer hover:text-black">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold p-2 rounded-xl border-b-2 border-green-300 hover:text-black"
                    : "text-gray-700 hover:text-white hover:font-bold hover:p-2 hover:rounded-xl hover:border-b-2 hover:border-green-300 "
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
