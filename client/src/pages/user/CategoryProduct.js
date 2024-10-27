import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const getCategoryWiseProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category-products/${id}`,
        { withCredentials: true }
      );
      console.log("API Response:", res.data);
      if (res.data?.success) {
        setProducts(res.data.products);
      } else {
        toast.error("No products found for this category");
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error("Something went wrong in getting products");
    }
  }, [id]);

  useEffect(() => {
    getCategoryWiseProduct();
  }, [getCategoryWiseProduct]);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Products in Category</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link key={p._id} to={`/user/single-product/${p._id}`}>
                <div className="card m-2 custom-card">
                  <img
                    src={p.images?.[0]?.url || "/images/default_image.jpg"}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title text-center">{p.name}</h5>
                    <p
                      className="card-text text-center"
                      style={{ flexGrow: 1 }}
                    >
                      {p.description}
                    </p>
                    <button className="btn btn-primary mt-auto">
                      View Details
                    </button>
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

export default CategoryProduct;
