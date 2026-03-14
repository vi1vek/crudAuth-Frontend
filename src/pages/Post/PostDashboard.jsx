import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostDashboard = () => {
  const [loading, setLoding] = useState(false);
  // const navigate = useNavigate()
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState([]);

  async function getUser() {
    try {
      setLoding(true);
      const resp = await axios.get(
        "https://crudauth-backend.onrender.com/api/post",
        {
          withCredentials: true,
        },
      );

      //   console.log(resp.data.post);
      setMsg(resp.data.message);
      setData(resp.data.post);
      //   alert(resp.data.message);
      //   navigate("/verify");
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
      <div>
        <table className="min-w-full divide-y divide-gray-200 border border-gray-600 border-collapse">
          <thead className="bg-green-200 border-3 p-5  justify-center align-middle text-2xl border-gray-600 ">
            <tr>
              <td className="border border-gray-600 px-4 py-2">
                Product Title
              </td>
              <td className="border border-gray-600 px-4 py-2">Price</td>
              <td className="border border-gray-600 px-4 py-2">Action</td>
            </tr>
          </thead>
          <tbody className="bg-pink-200 border-3 p-5  justify-center align-middle text-2xl ">
            {data.length > 0 ? (
              data.map((dat) => {
                return (
                  <tr key={dat._id}>
                    <td className="border border-gray-600 px-4 py-2">
                      {dat.title}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {dat.price}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      <Link to={`/edit/${dat._id}`}>Edit</Link>
                      {/* <button onClick={()=>deletedProduct(dat._id)} className="text-red-500 hover:underline cursor-pointer ml-5">Delete</button>  */}
                    </td>
                  </tr>
                );
              })
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
    </>
  );
};

export default PostDashboard;
