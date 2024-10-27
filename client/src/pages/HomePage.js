import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <Link key={p._id} to={`/user/single-product/${p._id}`}>
              <div
                className="card m-2"
                style={{
                  width: "200px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
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
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
