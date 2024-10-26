import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SingleUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Fetch single user details
  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/get-single-user/${params.id}`,
        { withCredentials: true }
      );

      // Set user data in state
      setUser(data.user);
      // Initialize input fields with fetched user data
      setName(data.user.name);
      setEmail(data.user.email);
      setAddress(data.user.address);
      setCity(data.user.city);
      setCountry(data.user.country);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  };

  useEffect(() => {
    console.log("Params in UserDetails:", params); // Log params to debug
    if (params.id && params.id !== "undefined") {
      getSingleUser(); // Call function to fetch user data if id is valid
    } else {
      console.error("User ID is undefined"); // Log error if ID is undefined
    }
    //eslint-disable-next-line
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("email", email);
      userData.append("address", address);
      userData.append("city", city);
      userData.append("country", country);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/update`, // Change params._id to params.id
        userData,
        { withCredentials: true }
      );

      console.log("Response from update:", data);

      if (data?.success) {
        toast.success(data.message);
        navigate("/"); // Navigate after success
      } else {
        toast.error("User is not updated");
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
            <h1 className="text-center">Update User</h1>

            <form onSubmit={handleUpdate}>
              {" "}
              {/* Use form for handling submission */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Bind input to name state
                  className="form-control"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Bind input to email state
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} // Bind input to address state
                  className="form-control"
                  placeholder="Enter Address"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)} // Bind input to city state
                  className="form-control"
                  placeholder="Enter City"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)} // Bind input to country state
                  className="form-control"
                  placeholder="Enter Country"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  UPDATE USER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleUser;
