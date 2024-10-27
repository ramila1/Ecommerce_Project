import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        if (data.success) {
          setUserProfile(data.user);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>{userProfile?.name || "Loading..."}</h1>
              <h1>{userProfile?.email || "Loading..."}</h1>
              <h1>{userProfile?.phone || "Loading..."}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
