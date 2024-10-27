import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/get-all-users`,
        { withCredentials: true }
      );
      console.log("Fetched users:", res.data.users);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong in getting users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users Lists</h1>
            <div className="d-flex flex-wrap">
              {users?.map((user) => (
                <Link key={user._id} to={`/admin/single-user/${user._id}`}>
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={
                        user.profilePicture?.url || "/images/default_image.jpg"
                      }
                      className="card-img-top"
                      alt={user.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{user.name}</h5>
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

export default Users;
