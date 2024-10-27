import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/getall-product`,
        { withCredentials: true }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  const handleProductClick = (e, productId) => {
    if (!auth?.user) {
      e.preventDefault();
      alert("Please Sign In first");
    } else if (auth.user.role === "admin") {
      navigate(`/admin/product-details/${productId}`);
    } else {
      navigate(`/user/single-product/${productId}`);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div
              key={p._id}
              onClick={(e) => handleProductClick(e, p._id)}
              className="card m-2"
              style={{ cursor: "pointer" }}
            >
              <img
                src={p.images?.[0]?.url || "/images/default_image.jpg"}
                className="card-img-top"
                alt={p.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div className="card-body" style={{ flex: 1 }}>
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
