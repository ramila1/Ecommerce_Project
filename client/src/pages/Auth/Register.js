import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [answer, setAnswer] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("answer", answer);
    if (profilePicture) {
      formData.append("file", profilePicture);
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h4 className="title">REGISTER FORM</h4>
          <div className="form-grid">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                What is Your Favorite Food?
              </label>
              <input
                id="answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profilePicture" className="form-label">
                Profile Picture
              </label>
              <input
                id="profilePicture"
                type="file"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="form-control"
                required
              />
            </div>
            {/* Adding more space above the button */}
            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
