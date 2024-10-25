import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [answer, setAnswer] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      name,
      email,
      password,
      phone,
      address,
      city,
      country,
      profilePicture,
      answer
    );
    toast.success("Register Success");
  };
  return (
    <Layout>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              id="exampleInputCity"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputCountry" className="form-label">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              id="exampleInputCountry"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputAnswer" className="form-label">
              What is your Favourite Food?
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputPicturee" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="form-control"
              id="exampleInputPicture"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
