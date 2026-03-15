import { Link } from "react-router-dom";
import whatsapp from "./image/whatsapp.png";
import axios from "axios";
import { useEffect, useState } from "react";
const Card = ({ id, title, price }) => {
  const [loading, setLoding] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure. You want to delete this product.")) {
      try {
        setLoding(true);
        const resp = await axios.delete(
          `http://localhost:5000/api/post/delete/${id}`,

          {
            withCredentials: true,
          },
        );
        setLoding(false);

        alert(resp.data.message);
      } catch (error) {
        var fromBack = error.response.data.message;

        return alert(fromBack);
      }
    }
  };

  return (
    <div className="max-w-sm bg-white border hover:scale-105 border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-row m-4">
      <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={whatsapp}
          alt="img"
          id="product-image"
          className="h-full object-contain transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <h3
          id="product-title"
          className="text-xl font-bold text-gray-800 truncate"
        >
          {title}
        </h3>
        <div className="flex iitems-center justify-between mt-2">
          <span
            id="product-price"
            className=" block text-2xl w-full px-4 py-3 transition"
          >
            Price &#8377;{Number(price).toLocaleString("en-IN")}
          </span>
        </div>

        {/* <input type="number" id="product-quantity" /> */}
        {id ? (
          <>
            <Link
              to={`/update/${id}`}
              id="btn"
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              id="btn"
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            id="btn"
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
