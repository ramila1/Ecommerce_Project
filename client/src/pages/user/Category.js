import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/category/get-all-category",
        { withCredentials: true }
      );
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Categories</h1>
            <div className="d-flex flex-wrap">
              {categories?.map((category) => (
                <Link
                  key={category._id}
                  to={`/user/all-category/category/get-category-products/${category._id}`}
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={category.image?.url || "/images/default_image.jpg"}
                      className="card-img-top"
                      alt={category.category_name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.category_name}</h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
