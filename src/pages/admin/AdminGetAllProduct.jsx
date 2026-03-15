import axios from "axios";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminGetAllProduct = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoding] = useState(false);
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState([]);

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure. You want to delete All products.")) {
      try {
        const resp = await axios.delete(
          `http://localhost:5000/api/post/admin/alldelete`,

          {
            withCredentials: true,
          },
        );
        alert(resp.data.message);
      } catch (error) {
        var fromBack = error.response.data.message;
        return alert(fromBack);
      }
    }
  };

  async function getUser() {
    try {
      setLoding(true);
      const resp = await axios.get("http://localhost:5000/api/post/allusers", {
        withCredentials: true,
      });
      setMsg(resp.data.message);
      setData(resp.data.post);
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      // alert("Signup failed!")
      setLoding(false);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user === "admin" ? (
        <div>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-600 border-collapse">
            <thead className="bg-green-200 border-3 p-5  justify-center align-middle text-2xl border-gray-600 ">
              <tr>
                <td className="border border-gray-600 px-4 py-2">Id</td>
                <td className="border border-gray-600 px-4 py-2">Title</td>
                <td className="border border-gray-600 px-4 py-2">Price</td>
                <td className="border border-gray-600 px-4 py-2">Created by</td>
                <td className="border border-gray-600 px-4 py-2">Acion</td>
              </tr>
            </thead>
            <tbody className="bg-pink-200 border-3 p-5  justify-center align-middle text-2xl ">
              {data.length > 0 ? (
                <>
                  {data.map((dat) => {
                    return (
                      <tr key={dat._id}>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat._id}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.title}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.price}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.userId?.name}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <Link to={`/edit/${dat._id}`}>Edit</Link>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">
                      <button
                        onClick={() => handleDeleteAll()}
                        id="btn"
                        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Admin Delete All Products
                      </button>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-500">
                    {msg ? msg : "No records."}
                    <Link to="/products" className="text-blue-500 ml-2">
                      Create one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Access Denied.</h1>
      )}
    </>
  );
};

export default AdminGetAllProduct;
