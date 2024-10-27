import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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
          {
            withCredentials: true,
          }
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update User</h1>
      <div className="mb-4">
        <img
          src={user.profilePicture?.url || "/images/default_image.jpg"}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-2"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
          required
        />
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
        />
        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleChange}
          placeholder="City"
          className="input"
        />
        <input
          type="text"
          name="country"
          value={user.country}
          onChange={handleChange}
          placeholder="Country"
          className="input"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="input"
        />
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="input"
        />
        <button type="submit" className="btn">
          Update User
        </button>
      </form>
    </div>
  );
};

export default SingleUser;
