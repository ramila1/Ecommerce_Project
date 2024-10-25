import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldpassword: "",
    newpassword: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, user not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
          setUpdatedData({
            name: res.data.user.name,
            email: res.data.user.email,
            address: res.data.user.address,
          });
        } else {
          setError("Failed to fetch user profile: " + res.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(
          "Error: " +
            (error.response
              ? error.response.data.message
              : "No response from server.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setEditMode(false);
        setError(null);
      } else {
        setError("Failed to update profile: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError(
        "Error: " +
          (error.response
            ? error.response.data.message
            : "No response from server.")
      );
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/update-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("res.data.message");
        localStorage.removeItem("token"); // Clear the token
        window.location.reload(); // Refresh the page to redirect
      } else {
        setError("Failed to update password: " + res.data.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError(
        "Error: " +
          (error.response
            ? error.response.data.message
            : "No response from server.")
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in updatedData) {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setPasswordData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <Layout>
      <div>
        {loading ? (
          <p>Loading user data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : user ? (
          <div>
            <h2>Welcome, {user.name}</h2>
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={updatedData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <table className="min-w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Name</td>
                      <td className="border border-gray-300 p-2">
                        {user.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Email</td>
                      <td className="border border-gray-300 p-2">
                        {user.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Address</td>
                      <td className="border border-gray-300 p-2">
                        {user.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">City</td>
                      <td className="border border-gray-300 p-2">
                        {user.city}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Country</td>
                      <td className="border border-gray-300 p-2">
                        {user.country}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Phone</td>
                      <td className="border border-gray-300 p-2">
                        {user.phone}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-secondary mt-4"
                >
                  Edit Profile
                </button>
              </div>
            )}

            {/* Password Update Section */}
            <div className="mt-6">
              <h3>Update Password</h3>
              <form onSubmit={handlePasswordUpdate}>
                <div>
                  <input
                    type="password"
                    name="oldpassword"
                    value={passwordData.oldpassword}
                    onChange={handleChange}
                    placeholder="Old Password"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="newpassword"
                    value={passwordData.newpassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>No user profile available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
