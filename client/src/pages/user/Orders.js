import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/order/user/user-all-orders`,
        { withCredentials: true }
      );
      console.log("Fetched orders:", res.data);

      setOrders(res.data.orders);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching the orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
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
      </div>
    </Layout>
  );
};

export default Orders;
