import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const EditPost = () => {
  const { id } = useParams();
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!data.title || !data.price) {
    //   return alert("All Fields are required.");
    // }

    try {
      setLoding(true);

      const resp = await axios.put(
        `http://localhost:5000/api/post/update/${id}`,
        data,
        {
          withCredentials: true,
        },
      );

      alert(resp.data.message);
      navigate("/products/getall");
    } catch (err) {
      var fromBack = err.response.data.message;
      return alert(fromBack);
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-green-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Update Product
          </h2>
          <form className="space-y-4">
            <div className="mb-3">
              <label htmlFor="title">
                Product Title<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                id="title"
                name="title"
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price">
                Price<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                id="price"
                name="price"
                placeholder="Enter price"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md cursor-pointer"
            >
              {loading ? "Loding..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
