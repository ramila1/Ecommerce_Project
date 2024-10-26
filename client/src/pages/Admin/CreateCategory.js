import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category_name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedCategory, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/category/create-category`,
        { category_name },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(`${category_name} is created`);
        getAllCategory();
        setName(""); // Clear the input after creating a category
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/category/update-category/${selected._id}`,
        { updatedCategory },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(`${updatedCategory} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during the update");
    }
  };

  const handleDelete = async (cId, category_name) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/category/delete-category/${cId}`,
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success(`${category_name} is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during the update");
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
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={category_name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.category_name}</td>
                      <td>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => {
                            setOpen(true);
                            setUpdatedName(c.category_name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => {
                            handleDelete(c._id, c.category_name);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setOpen(false)}
            footer={null}
            open={open}
            title="Edit Category"
          >
            <CategoryForm
              value={updatedCategory}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
