import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommer App">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div></div>
            <a
              href="#"
              className="link-primary"
              onClick={() => {
                navigate("/forget-password");
              }}
            >
              Forgot Password?
            </a>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
            <div></div>
            <a
              href="#"
              className="link-primary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Don't have account?
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
