import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Post/Card";

const HomeDashboard = () => {
  const [loading, setLoding] = useState(false);
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState([]);

  async function getUser() {
    try {
      setLoding(true);
      const resp = await axios.get("http://localhost:5000/api/post/dashboard", {
        withCredentials: true,
      });

      setMsg(resp.data.message);

      setData(resp.data.post);
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      setLoding(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="min-h-full w-full bg-green-300">
        <div className="flex flex-wrap justify-center gap-6">
          {data.length > 0 ? (
            data.map((dat) => {
              return <Card key={dat._id} title={dat.title} price={dat.price} />;
            })
          ) : (
            <div colSpan="3" className="text-center py-10 text-gray-500">
              {msg ? msg : "No Product."}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
