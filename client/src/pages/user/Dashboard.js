import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 text-center">
              <div className="d-flex flex-column align-items-center">
                {auth?.user?.profilePicture && (
                  <img
                    src={auth.user.profilePicture.url}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px", height: "150px" }} // Adjust size as needed
                  />
                )}
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
