import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    images: [],
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/get-single-product/${id}`,
          { withCredentials: true }
        );
        if (response.data.product) {
          setProduct(response.data.product);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
        toast.error("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

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
        console.error("Error fetching categories", error);
        toast.error("Something went wrong in getting categories");
      }
    };

    getSingleProduct();
    getAllCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setFile(e.target.files[0]);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in product) {
      formData.append(key, product[key]);
    }

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/product/update-product/${id}`,
        formData,
        { withCredentials: true }
      );
      if (response?.data.success) {
        toast.success("Product updated successfully!");
        navigate("/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Error updating product");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/product/delete-product/${id}`,
          { withCredentials: true }
        );
        if (response?.data.success) {
          toast.success("Product deleted successfully!");
          navigate("/admin/products");
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product", error);
        toast.error("Error deleting product");
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/product/delete-image/${id}?id=${imageId}`,
          { withCredentials: true }
        );
        if (response?.data.success) {
          toast.success("Image deleted successfully!");
          setProduct((prevProduct) => ({
            ...prevProduct,
            images: prevProduct.images.filter((img) => img._id !== imageId),
          }));
        } else {
          toast.error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image", error);
        toast.error("Error deleting image");
      }
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Update Product</h1>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <form onSubmit={handleUpdateProduct}>
                <div className="m-1 w-75">
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    value={product.category}
                    onChange={(value) =>
                      setProduct({ ...product, category: value })
                    }
                    className="form-select mb-3"
                  >
                    {categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.category_name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Product Name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter Description of Product"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Product Price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="stock"
                    className="form-control"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Enter Product Stock"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {file ? "File selected" : "Upload Photo"}
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={handleChange}
                      hidden
                    />
                  </label>
                </div>

                <div className="row">
                  {product.images.map((img) => (
                    <div key={img.public_id} className="col-md-3 mb-3">
                      <div className="card">
                        <img
                          src={img.url}
                          className="card-img-top"
                          alt="product pic"
                          height="200px"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img._id)}
                          className="btn btn-danger mt-2"
                        >
                          Delete Image
                        </button>
                      </div>
                    </div>
                  ))}
                  {file && (
                    <div className="col-md-3 mb-3">
                      <div className="card">
                        <img
                          src={URL.createObjectURL(file)}
                          className="card-img-top"
                          alt="new product pic"
                          height="200px"
                        />
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="btn btn-danger mt-2"
                        >
                          Remove Selected Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    UPDATE PRODUCT
                  </button>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    DELETE PRODUCT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
