import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Orders = () => {
  const params = useParams(); // Extract parameters from the URL
  const [orders, setOrders] = useState([]); // State to store the fetched orders
  const [loading, setLoading] = useState(true); // State for loading status

  const getAllOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/order/user/user-all-orders`,
        { withCredentials: true }
      );
      console.log("Fetched orders:", res.data); // Log the response data
      // Access orders array from the response data
      setOrders(res.data.orders); // Set the fetched orders data correctly
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder(); // Fetch the orders when the component mounts
  }, [params.id]);

  if (loading) return <div>Loading...</div>; // Show loading text while fetching

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          {/* You can include additional menu components here if needed */}
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Order Details</h1>
          <div className="d-flex flex-wrap">
            {Array.isArray(orders) &&
              orders.map((order) => (
                <div
                  key={order._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <h5 className="card-text">
                      Product Name: {order.item_name}
                    </h5>

                    <p className="card-text">
                      Payment Method: {order.payment_method}
                    </p>
                    <p className="card-text">
                      Order Status: {order.order_status}
                    </p>
                    <p className="card-text">
                      Total: ${order.items_total_amount}
                    </p>

                    <h6>Shipping Information:</h6>
                    <p className="card-text">
                      Address: {order.shipping_information.address}, City:{" "}
                      {order.shipping_information.city}, Country:{" "}
                      {order.shipping_information.country}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
