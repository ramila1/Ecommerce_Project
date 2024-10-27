import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  const getAllOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/order/admin/get-all-orders`,
        { withCredentials: true }
      );
      console.log(res.data);
      setOrders(res.data.order);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting orders");
    }
  };

  const handleChangeStatus = (orderId, currentStatus) => {
    setCurrentOrderId(orderId);
    setCurrentStatus(currentStatus);
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/order/admin/order-status/${currentOrderId}`,
        { status: currentStatus },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setVisible(false);
      getAllOrders();
    } catch (error) {
      console.log(error);
      toast.error("Error changing order status");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders List</h1>
            <div className="d-flex flex-wrap">
              {orders.length === 0 ? (
                <p>No orders available.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="card m-2"
                    style={{ width: "20rem", height: "fit-content" }}
                  >
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">Shipping Information</h5>
                      <p>
                        Address: {order.shipping_information?.address || "N/A"}
                      </p>
                      {order.order_products.length > 0 && (
                        <>
                          <h5 className="card-title">
                            Product: {order.order_products[0]?.name || "N/A"}
                          </h5>
                          <p className="card-text">
                            Price: ${order.order_products[0]?.price || 0}
                          </p>
                          <p className="card-text">
                            Quantity: {order.order_products[0]?.quantity || 0}
                          </p>
                        </>
                      )}
                      <h5 className="card-title">
                        Order Total: ${order.items_total_amount}
                      </h5>
                      <p className="card-text">
                        Payment Method: {order.payment_method}
                      </p>
                      <p className="card-text">
                        Order Status: {order.order_status}
                      </p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleChangeStatus(order._id, order.order_status)
                          }
                        >
                          Change Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Change Order Status"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Current Status: {currentStatus}</p>
        <p>Select new status:</p>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </Modal>
    </Layout>
  );
};

export default AllOrder;
