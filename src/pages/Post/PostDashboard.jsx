import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Card from "./Card";

const PostDashboard = () => {
  const [loading, setLoding] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  // const navigate = useNavigate()
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState([]);

  async function getUserId() {
    const resp = await axios.get("http://localhost:5000/api/user/getId", {
      withCredentials: true,
    });
    setUser(resp.data.user.role);
  }

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure. You want to delete All products.")) {
      try {
        const resp = await axios.delete(
          `http://localhost:5000/api/post/alldelete`,

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
      const resp = await axios.get("http://localhost:5000/api/post", {
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
    getUserId();
    getUser();
  }, []);
  return (
    <>
      <div className="min-h-full w-full bg-green-300">
        <div className="flex flex-wrap justify-center gap-6">
          {data.length > 0 ? (
            <>
              {data.map((dat) => {
                return (
                  <Card
                    key={dat._id}
                    id={dat._id}
                    title={dat.title}
                    price={dat.price}
                  />
                );
              })}
              <button
                onClick={handleDeleteAll}
                id="btn"
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                Delete All
              </button>
            </>
          ) : (
            <div colSpan="3" className="text-center py-10 text-gray-500">
              {msg ? msg : "No Product."}
            </div>
          )}
        </div>

        <div colSpan="3" className="text-center py-10 text-gray-500">
          <Link to="/products" className="text-blue-500 ml-2">
            Create Another Post
          </Link>
        </div>

        {user === "admin" ? (
          <div colSpan="3" className="text-center py-10 text-gray-500">
            <Link to="/admin/getalluser" className="text-blue-500 ml-2">
              Admin DashBoard
            </Link>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PostDashboard;
