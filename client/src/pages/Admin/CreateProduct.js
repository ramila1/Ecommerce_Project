import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [file, setImages] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("file", file);

      const { data } = axios.post(
        `${process.env.REACT_APP_API}/product/create-product`,
        productData,
        { withCredentials: true }
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="conatiner-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">CREATE PRODUCT</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
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
                {file ? file.name : "Upload Photo"}

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files[0])}
                  hidden
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              {file && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="product pic"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              CREATE
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
