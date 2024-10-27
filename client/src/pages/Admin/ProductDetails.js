import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { user } = useAuth();

  const getSingleProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/get-single-product/${id}`,
        { withCredentials: true }
      );
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting the product");
    }
  }, [id]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">{product.name}</h1>
            <div className="row">
              <div className="col-md-6">
                <img
                  src={product.images?.[0]?.url || "/images/default_image.jpg"}
                  alt={product.name}
                  className="img-fluid smaller-image"
                />
              </div>
              <div className="col-md-6">
                <h3>Description</h3>
                <p>{product.description}</p>
                <h4>Price: ${product.price}</h4>
                <h5>Stock: {product.stock}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
