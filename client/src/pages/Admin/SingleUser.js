import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/get-single-user/${id}`,
          { withCredentials: true }
        );
        console.log("Fetched user data:", response.data);
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          toast.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setFile(e.target.files[0]);
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("address", user.address);
    formData.append("city", user.city);
    formData.append("country", user.country);
    formData.append("phone", user.phone);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/update-other-user/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Failed to update user");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 text-center">
            <h1 className="text-center">Update User</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <img
                  src={user.profilePicture?.url || "/images/default_image.jpg"}
                  alt="Profile"
                  style={{ width: "150px", height: "150px" }}
                  className="rounded-full mb-2"
                />
              </div>

              <div className="mb-3 row">
                <label htmlFor="name" className="col-md-4 col-form-label">
                  Name:
                </label>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="email" className="col-md-4 col-form-label">
                  Email:
                </label>
                <div className="col-md-5">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="address" className="col-md-4 col-form-label">
                  Address:
                </label>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="city" className="col-md-4 col-form-label">
                  City:
                </label>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="country" className="col-md-4 col-form-label">
                  Country:
                </label>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="file" className="col-md-4 col-form-label">
                  Profile Picture:
                </label>
                <div className="col-md-5">
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="phone" className="col-md-4 col-form-label">
                  Phone:
                </label>
                <div className="col-md-5">
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUser;
