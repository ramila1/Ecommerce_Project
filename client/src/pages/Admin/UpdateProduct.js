import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [files, setImages] = useState(null);
  const [id, setId] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  // Fetch single product details
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/get-single-product/${params.slug}`,
        { withCredentials: true }
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setStock(data.product.stock);
      setCategory(data.product.category);

      if (data.product.images && data.product.images.length > 0) {
        setCurrentImage(data.product.images[0].url);
      } else {
        setCurrentImage("");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Error fetching product details");
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/category/get-all-category",
        { withCredentials: true }
      );
      if (res.data?.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    //eslint-disable-nextline
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);

      // Log the selected files
      console.log("Selected files:", files);

      if (files) {
        productData.append("files", files); // Send image file
      }

      console.log("Product data being sent:", Object.fromEntries(productData));

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/product/update/${params.id}`,
        productData,
        { withCredentials: true }
      );

      console.log("Response from update:", data);

      if (data?.success) {
        toast.success(data.message);
        navigate("/"); // Navigate after success
      } else {
        toast.error("Product is not updated");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/product/delete-product/${id}`,
        { withCredentials: true }
      );
      toast.success("Product deleted successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Product Name"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                placeholder="Enter Description of Product"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                placeholder="Enter Product Price"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-control"
                placeholder="Enter Product Stock"
                required
              />
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {files ? files.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={
                  files
                    ? URL.createObjectURL(files)
                    : currentImage || "/images/default_image.jpg"
                }
                className="card-img-top"
                alt="product pic"
                height="200px"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
