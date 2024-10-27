import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    payment_method: "ONLINE",
    total_amount: 0,
    address: "",
    city: "",
    country: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

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
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }
    getSingleProduct();
  }, [getSingleProduct, id]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/order/payment`,
        {
          totalAmount: orderDetails.total_amount,
        },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/");
        setClientSecret(data.client_secret);
        handleSubmit();
      } else {
        toast.error(
          "Failed to create payment intent. Please check your request."
        );
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Error creating payment intent. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            address: {
              line1: orderDetails.address,
              city: orderDetails.city,
              country: orderDetails.country,
            },
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
    } else {
      if (paymentIntent.status === "succeeded") {
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
              quantity: 1,
              image: product.images?.[0]?.url,
            },
          ],
          payment_method: orderDetails.payment_method,
          payment_info: {
            id: paymentIntent.id,
          },
          item_name: product.name,
          item_price: product.price,
          item_tax: 0,
          item_shipping_cost: 0,
          items_total_amount: orderDetails.total_amount,
          order_status: "processing",
        };

        navigate("/");
      }
    }
  };

  return (
    <Layout>
      <div className="payment-container">
        <form onSubmit={handlePayment} className="payment-form">
          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <input
              type="text"
              className="form-control"
              value={orderDetails.payment_method}
              readOnly
            />
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
          <CardElement className="mb-3" />
          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Payment;
