import React, { useEffect, useState, useCallback, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useAuth } from "../../context/auth";
const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    address: "",
    city: "",
    country: "",
    quantity: 1,
    payment_method: "COD",
    total_amount: 0,
  });

  // Assuming the AuthContext provides user data
  const { user } = useAuth();

  const getSingleProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/product/get-single-product/${id}`,
        { withCredentials: true }
      );
      setProduct(res.data.product);
      setOrderDetails((prevDetails) => ({
        ...prevDetails,
        total_amount: res.data.product.price,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting the product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);

  const handleOrderClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) {
      toast.error("Product not found");
      return; // Early return if product is null
    }

    try {
      const orderData = {
        shipping_information: {
          address: orderDetails.address,
          city: orderDetails.city,
          country: orderDetails.country,
        },
        order_products: [
          {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: orderDetails.quantity,
            image: product.images?.[0]?.url,
          },
        ],
        payment_method: orderDetails.payment_method,
        payment_info: {},
        item_name: product.name,
        item_price: product.price,
        item_tax: 0,
        item_shipping_cost: 0,
        items_total_amount: orderDetails.total_amount,
        order_status: "processing",
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API}/order/create-order`,
        orderData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalVisible(false);

        // Check if payment method is COD
        if (orderDetails.payment_method === "COD") {
          navigate("/"); // Redirect to home page
        } else {
          navigate(`/user/payment/${product._id}`); // Redirect to payment page for other methods
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while creating the order");
    }
  };

  // Loading state handling and conditional rendering for product details
  if (loading) {
    return (
      <Layout>
        <div className="container text-center">Loading...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container text-center">Product not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h1 className="text-center">{product.name}</h1>
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.images?.[0]?.url || "/images/default_image.jpg"}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h3>Description</h3>
            <p>{product.description}</p>
            <h4>Price: ${product.price}</h4>
            <h5>Stock: {product.stock}</h5>
            {/* Conditionally render the order button based on user role */}
            {!user || user.role !== "admin" ? (
              <button onClick={handleOrderClick} className="btn btn-primary">
                Order
              </button>
            ) : null}
          </div>
        </div>

        <Modal
          title="Create Order"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={orderDetails.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={orderDetails.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={orderDetails.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                min={1}
                max={product.stock}
                value={orderDetails.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select
                name="payment_method"
                className="form-control"
                value={orderDetails.payment_method}
                onChange={handleChange}
                required
              >
                <option value="COD">Cash on Delivery</option>
                <option value="ONLINE">Online Payment</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Total Amount</label>
              <input
                type="number"
                name="total_amount"
                className="form-control"
                value={orderDetails.total_amount}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default SingleProduct;
