import React from "react";
import Layout from "./Layout";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>

        <NavLink
          to="/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/admin/products"
          className="list-group-item list-group-item-action"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/all-order"
          className="list-group-item list-group-item-action"
        >
          All Orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
