import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
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
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products Lists</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link key={p._id} to={`/admin/products/${p.slug}`}>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={p.images?.[0]?.url || "/images/default_image.jpg"}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
