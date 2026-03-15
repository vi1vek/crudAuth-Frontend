import axios from "axios";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoding] = useState(false);
  // const navigate = useNavigate()
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState([]);

  async function getUser() {
    try {
      setLoding(true);
      const resp = await axios.get(
        "http://localhost:5000/api/user/getallusers",
        {
          withCredentials: true,
        },
      );
      setMsg(resp.data.message);
      setData(resp.data.user);
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
                <td className="border border-gray-600 px-4 py-2">Name</td>
                <td className="border border-gray-600 px-4 py-2">Email</td>
                <td className="border border-gray-600 px-4 py-2">Role</td>
                <td className="border border-gray-600 px-4 py-2">Acion</td>
              </tr>
            </thead>
            <tbody className="bg-pink-200 border-3 p-5  justify-center align-middle text-2xl ">
              {data.length > 0
                ? data.map((dat) => {
                    return (
                      <tr key={dat._id}>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat._id}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.name}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.email}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          {dat.role}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">
                          <Link to={`/edit/${dat._id}`}>Edit</Link>
                          {/* <button onClick={()=>deletedProduct(dat._id)} className="text-red-500 hover:underline cursor-pointer ml-5">Delete</button>  */}
                        </td>
                      </tr>
                    );
                  })
                : ""}
              <tr>
                <td>
                  <Link to={"/admin/getallproducts"}>All Users Products</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Access Denied.</h1>
      )}
    </>
  );
};

export default AdminDashboard;
